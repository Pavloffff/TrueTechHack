#include "tools.h"
#include <opencv2/opencv.hpp>
#include <nadjieb/mjpeg_streamer.hpp>
#include <algorithm>

using MJPEGStreamer = nadjieb::MJPEGStreamer;

std::queue<nlohmann::json> commands;
int callback = -1;

void film(std::string filmName, int port)
{
    cv::VideoCapture cap(filmName);

    int fps = cap.get(cv::CAP_PROP_FPS);
    int shift = 5;

    int colorThreshold = 50;
    int brightnessThreshold = 50;
    int darkFramesCount = 100;
    int darkFramesCounter = 0;

    cv::Mat frame0, hsv0;
    cv::Scalar meanHsv;
    std::vector<cv::Mat> hsvChannels;
    double lastBrightness = cv::mean(hsv0(cv::Rect(0, 0, hsv0.cols, hsv0.rows)), cv::Mat())[2];

    std::vector<int> params = {cv::IMWRITE_JPEG_QUALITY, 90};
    MJPEGStreamer streamer;
    nlohmann::json command;
    command["type"] = "empty";
    int frameFlag = 1, width, heigth;
    int brightFlag = 0, contrFlag = 0, saturFlag = 0, filterflag = 0, monoFlag = 0, blueFlag = 0, epilepsyFlag = 0, hueFlag = 0;
    double brightness, contrast, saturate;
    int brightIncrement = 0, contrIncrement = 0, saturIncrement = 0, hueIncrement = 0;
    while (callback == 1) {
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
                cv::Mat frame, brightenedImage, contrastedImage, saturatedImage, huedImage, monochromaticImage, res;
                if (command["type"] == "pause") {
                    while (command["type"] == "pause") {
                        if (!commands.empty()) {
                            command = commands.front();
                            commands.pop();
                        }
                        continue;
                    }
                }
                cap >> frame;
                if (frameFlag) {
                    heigth = frame.rows;
                    width = frame.cols;
                    frameFlag = 0;
                }
                if (frame.empty() || command["type"] == "remove") {
                    std::cout << port << ": end of video\n";
                    streamer.stop();
                    callback = 0;
                    break;
                }
                int curFrame = cap.get(cv::CAP_PROP_POS_FRAMES);
                if (command["type"] == "shift") {
                    if (command["vct"] == "right") {
                        cap.set(cv::CAP_PROP_POS_FRAMES, curFrame + fps * shift);
                    } else {
                        cap.set(cv::CAP_PROP_POS_FRAMES, curFrame - fps * shift);
                    }
                    command["type"] = "empty";
                }
                if (command["type"] == "filter") {
                    if (command["filterType"] == "brightness") {
                        brightness = cv::mean(frame)[0];
                        if (command["vct"] == "left") {
                            brightIncrement--;
                        } else {
                            brightIncrement++;
                        }
                        brightFlag = 1;
                    } else if (command["filterType"] == "contrast") {
                        if (command["vct"] == "left") {
                            contrIncrement--;
                        } else {
                            contrIncrement++;
                        }
                        contrFlag = 1;
                    } else if (command["filterType"] == "saturate") {
                        cv::Mat hsvImg;
                        cv::cvtColor(frame, hsvImg, cv::COLOR_BGR2HSV);
                        saturate = cv::mean(hsvImg)[1];
                        if (command["vct"] == "left") {
                            saturIncrement--;
                        } else {
                            saturIncrement++;
                        }
                        saturFlag = 1;
                    } else if (command["filterType"] == "monochromatic") {
                        monoFlag = !monoFlag;
                    } else if (command["filterType"] == "blue") {
                        blueFlag = !blueFlag;
                    } else if (command["filterType"] == "epilepsy") {
                        epilepsyFlag = !epilepsyFlag;
                    } else if (command["filterType"] == "hue") {
                        if (command["vct"] == "left") {
                            hueIncrement--;
                        } else {
                            hueIncrement++;
                        }
                        hueFlag = 1;
                    }
                    command["filterType"] = "empty";
                }
                if (brightFlag) {
                    cv::cvtColor(frame, brightenedImage, cv::COLOR_BGR2HSV); 
                    std::vector<cv::Mat> channels; 
                    cv::split(brightenedImage, channels);
                    channels[2] += (50 * brightIncrement); 
                    cv::merge(channels, brightenedImage);
                    cv::cvtColor(brightenedImage, res, cv::COLOR_HSV2BGR);
                }
                if (contrFlag) {
                    if (brightFlag) {
                        cv::cvtColor(res, contrastedImage, cv::COLOR_BGR2HSV);
                    } else {
                        cv::cvtColor(frame, contrastedImage, cv::COLOR_BGR2HSV);
                    }
                    int rows = contrastedImage.rows; 
                    int cols = contrastedImage.cols;
                    for (int i = 0; i < rows; i++) { 
                        for (int j = 0; j < cols; j++) { 
                            cv::Vec3b pixel = contrastedImage.at<cv::Vec3b>(i, j); 
                            if (pixel[2] >= 127) {
                                pixel[2] = std::min(pixel[2] + (20 * contrIncrement), 255); 
                            } else {
                                pixel[2] = std::max(pixel[2] - (20 * contrIncrement), 0); 
                            }
                            contrastedImage.at<cv::Vec3b>(i, j) = pixel; 
                        } 
                    }
                    cv::cvtColor(contrastedImage, res, cv::COLOR_HSV2BGR);
                }
                if (saturFlag) {
                    if (brightFlag || contrFlag) {
                        cv::cvtColor(res, saturatedImage, cv::COLOR_BGR2HSV);
                    } else {
                        cv::cvtColor(frame, saturatedImage, cv::COLOR_BGR2HSV);
                    }
                    std::vector<cv::Mat> channels; 
                    cv::split(saturatedImage, channels);
                    channels[1] += (50 * saturIncrement); 
                    cv::merge(channels, saturatedImage);
                    cv::cvtColor(saturatedImage, res, cv::COLOR_HSV2BGR);
                }
                if (monoFlag) {
                    if (brightFlag || contrFlag) {
                        cv::cvtColor(res, monochromaticImage, cv::COLOR_BGR2HSV);
                    } else {
                        cv::cvtColor(frame, monochromaticImage, cv::COLOR_BGR2HSV);
                    }
                    int hue_val = 20; 
                    monochromaticImage.forEach<cv::Vec3b>([&hue_val](cv::Vec3b& pixel, const int* position) { 
                        pixel[0] = (pixel[0] + hue_val) % 180; 
                    });
                    cv::cvtColor(monochromaticImage, res, cv::COLOR_HSV2BGR);
                }
                if (blueFlag) {
                    std::vector<cv::Mat> channels;
                    if (brightFlag || contrFlag || monoFlag) {
                        cv::split(res, channels);
                    } else {
                        cv::split(frame, channels);
                    }
                    channels[0] = channels[0] * 0.5;
                    cv::merge(channels, res);
                }
                if (epilepsyFlag) {
                    if (brightFlag || contrFlag || monoFlag || blueFlag) {
                        cv::cvtColor(res, hsv0, cv::COLOR_BGR2HSV);
                    } else {
                        cv::cvtColor(frame, hsv0, cv::COLOR_BGR2HSV);
                    }
                    cv::split(hsv0, hsvChannels);
                    cv::Scalar meanHSV = cv::mean(hsvChannels[2]);
                    double brightVal = meanHSV.val[0];
                    double colorChange = cv::mean(cv::abs(hsvChannels[0](cv::Rect(0, 1, hsvChannels[0].cols, hsvChannels[0].rows-1)) - hsvChannels[0](cv::Rect(0, 0, hsvChannels[0].cols, hsvChannels[0].rows-1)))).val[0];
                    if (colorChange > colorThreshold || std::abs(brightVal - lastBrightness) > brightnessThreshold) {
                        darkFramesCounter = darkFramesCount;
                    }
                    if (darkFramesCounter > 0) {
                        cv::Mat epilepsyScreen = cv::Mat::zeros(heigth, width, CV_8UC3);
                        epilepsyScreen.setTo(cv::Scalar(125, 125, 125)); 
                        cv::Scalar color(80, 80, 80); // серый цвет текста 
                        int fontFace = cv::FONT_HERSHEY_SIMPLEX; 
                        double fontScale = width / 350; 
                        int thickness = width / 200; 
                        cv::Point textOrg(50, heigth / 2 - heigth / 5); // координаты текста 
                        cv::putText(epilepsyScreen, "this scene can cause", textOrg, fontFace, fontScale, color, thickness);
                        cv::Point textOrg2(50, heigth / 2 + heigth / 5);
                        cv::putText(epilepsyScreen, "an epileptic seizure", textOrg2, fontFace, fontScale, color, thickness);
                        res = epilepsyScreen;
                        darkFramesCounter--;
                    } else if (!contrFlag && !brightFlag && !saturFlag && !monoFlag && !blueFlag) {
                        res = frame;
                    }
                    lastBrightness = brightVal;
                }
                if (hueFlag) {
                    if (brightFlag || contrFlag || monoFlag || blueFlag || epilepsyFlag) {
                        cv::cvtColor(res, huedImage, cv::COLOR_BGR2HSV);
                    } else {
                        cv::cvtColor(frame, huedImage, cv::COLOR_BGR2HSV);
                    }
                    std::vector<cv::Mat> channels; 
                    cv::split(huedImage, channels);
                    channels[0] += (30 * hueIncrement); 
                    cv::merge(channels, huedImage);
                    cv::cvtColor(huedImage, res, cv::COLOR_HSV2BGR);
                }
                if (!contrFlag && !brightFlag && !saturFlag && !monoFlag && !blueFlag && !epilepsyFlag && !hueFlag) {
                    res = frame;
                }
                std::vector<uchar> buff;
                cv::imencode(".jpg", res, buff, params);
                streamer.publish("/video", std::string(buff.begin(), buff.end()));
                std::this_thread::sleep_for(std::chrono::milliseconds(20));
            }
        }
    }
    std::cout << "end of thread" << std::endl;
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
        if (callback == 0) {
            break;
        }
        reply["ans"] = "error";
        nlohmann::json request = reply;
        if (reply["type"] == "start") {
            request["ans"] = "ok";
            request["port"] = serverPort;
            callback = 1;
            filmThread = std::thread(film, argv[2], serverPort);
            commands.push(reply);
        } else if (reply["type"] == "filter" || reply["type"] == "pause" || reply["type"] == "resume" || reply["type"] == "shift") {
            request["ans"] = "ok";
            commands.push(reply);
        } else if (reply["type"] == "remove") {
            commands.push(reply);
            request["ans"] = "ok";
            flag = 0;
        }
        Send(request, socket);
    }
    if (callback >= 0) {
        filmThread.detach();
    }
    socket.disconnect(("tcp://127.0.0.1:" + std::to_string(port)).c_str());
    destroySock(context, socket);
    return 0;
}
