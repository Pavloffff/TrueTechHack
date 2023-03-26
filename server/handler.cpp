#include "tools.h"
#include <opencv2/opencv.hpp>
#include <nadjieb/mjpeg_streamer.hpp>

using MJPEGStreamer = nadjieb::MJPEGStreamer;

std::queue<nlohmann::json> commands;
int callback = 1;

void film(std::string filmName, int port)
{
    cv::VideoCapture cap(filmName);
    std::vector<int> params = {cv::IMWRITE_JPEG_QUALITY, 90};
    MJPEGStreamer streamer;
    nlohmann::json command;
    command["type"] = "empty";
    while (callback) {
        if (!commands.empty()) {
            command = commands.front();
            commands.pop();
        }
        if (command["type"] == "start") {
            streamer.start(port);
            while (streamer.isRunning()) {
                if (!commands.empty()) {
                    command = commands.front();
                    commands.pop();
                }
                int brightness, contrast;
                int brightFlag = 0, contrFlag = 0, saturFlag = 0;
                cv::Mat frame, brightenedImage, contrastedImage, res;
                cap >> frame;
                if (frame.empty()) {
                    std::cout << port << ": end of video\n";
                    streamer.stop();
                    callback = 0;
                    break;
                }
                if (command["type"] == "filter") {
                    if (command["filterType"] == "brightness") {
                        brightness = command["value"];
                        brightFlag = 1;
                    } else if (command["filterType"] == "contrast") {
                        contrast = command["value"];
                        contrFlag = 1;
                    }
                } 
                if (brightFlag) {
                    frame.convertTo(brightenedImage, -1, 1, brightness);
                    res = brightenedImage;
                }
                if (contrFlag) {
                    if (brightFlag) {
                        res.convertTo(contrastedImage, -1, contrast, 0);
                        res = contrastedImage;
                    } else {
                        frame.convertTo(contrastedImage, -1, contrast, 0);
                        res = contrastedImage;
                    }
                }
                if (!contrFlag && !brightFlag) {
                    res = frame;
                }
                std::vector<uchar> buff;
                cv::imencode(".jpg", res, buff, params);
                streamer.publish("/video", std::string(buff.begin(), buff.end()));

                std::this_thread::sleep_for(std::chrono::milliseconds(20));
            }
        }
    }
}

int main(int argc, char const *argv[])
{
    std::thread filmThread;

    int port = std::atoi(argv[1]);
    zmq::context_t context;
    zmq::socket_t socket(context, zmq::socket_type::pair);
    socket.connect(("tcp://127.0.0.1:" + std::to_string(port)).c_str());
    int serverPort = port + 1;
    std::string filmName = argv[2];
    int flag = 1;
    while (flag && callback) {
        nlohmann::json reply = Recv(socket);
        reply["ans"] = "error";
        nlohmann::json request = reply;
        if (reply["type"] == "getPort") {
            request["ans"] = "ok";
            request["port"] = serverPort;
        } else if (reply["type"] == "start") {
            request["ans"] = "ok";
            filmThread = std::thread(film, argv[2], serverPort);
            commands.push(reply);
        } else if (reply["type"] == "filter") {
            request["ans"] = "ok";
            commands.push(reply);
        }
        Send(request, socket);
    }
    if (!callback) {
        filmThread.detach();
        destroySock(context, socket);
    }
    return 0;
}
