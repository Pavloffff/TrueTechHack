#include "tools.h"
#include <opencv2/opencv.hpp>
#include <nadjieb/mjpeg_streamer.hpp>

using MJPEGStreamer = nadjieb::MJPEGStreamer;

std::queue<nlohmann::json> commands;

void film(std::string filmName, int port)
{
    std::cout << filmName << " " << port << "\n";
    cv::VideoCapture cap(filmName);
    std::vector<int> params = {cv::IMWRITE_JPEG_QUALITY, 90};
    MJPEGStreamer streamer;
    nlohmann::json command;
    command["type"] = "empty";
    bool flag = true;
    while (flag) {
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
                cv::Mat frame, filtred;
                cap >> frame;
                if (frame.empty()) {
                    std::cerr << "frame not grabbed\n";
                    exit(EXIT_FAILURE);
                }
                if (command["type"] == "filter") {
                    cv::cvtColor(frame, filtred, cv::COLOR_BGR2HSV);
                } else {
                    filtred = frame;    
                }
                std::vector<uchar> buff;
                cv::imencode(".jpg", filtred, buff, params);
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
    while (flag) {
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
    return 0;
}
