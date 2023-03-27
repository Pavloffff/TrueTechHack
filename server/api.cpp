#include "tools.h"

std::map<int, std::pair<zmq::context_t, zmq::socket_t>> sockets;

int main(int argc, char const *argv[])
{
    std::string command;
    while (1) {
        std::cin >> command;
        nlohmann::json request;
        if (command == "create") {
            int id;
            std::string filmName;
            std::cin >> id >> filmName;
            int port = MINPORT + id * 2;
            zmq::context_t context;
            zmq::socket_t socket;
            initSock(context, socket);
            socket.bind(("tcp://*:" + std::to_string(port)).c_str());
            int pid = fork();
            if (pid == 0) {
                execl("handler", "handler", std::to_string(port).c_str(), filmName.c_str(), NULL);
                return 0;
            }
            request["type"] = "getPort";
            nlohmann::json reply = sendAndRecv(request, socket, 0);
            if (reply["ans"] == "ok") {
                std::cout << reply["port"] << std::endl;
                sockets[id] = std::make_pair(std::move(context), std::move(socket));
            } else {
                destroySock(context, socket);
            }
        } else if (command == "start") {
            int id;
            std::cin >> id;
            request["type"] = "start";
            nlohmann::json reply = sendAndRecv(request, sockets[id].second, 0);
            if (reply["ans"] == "ok") {
                std::cout << "Ok" << std::endl;
            }
        } else if (command == "filter") {
            int id;
            double value = 0;
            std::string filterType;
            std::cin >> id >> filterType >> value;
            request["type"] = "filter";
            request["filterType"] = filterType;
            request["value"] = value;
            nlohmann::json reply = sendAndRecv(request, sockets[id].second, 0);
            if (reply["ans"] == "ok") {
                std::cout << "Ok" << std::endl;
            }
        } else if (command == "pause") {
            int id;
            std::cin >> id;
            request["type"] = "pause";
            request["id"] = id;
            nlohmann::json reply = sendAndRecv(request, sockets[id].second, 0);
            if (reply["ans"] == "ok") {
                std::cout << "Ok" << std::endl;
            }
        } else if (command == "resume") {
            int id;
            std::cin >> id;
            request["type"] = "resume";
            request["id"] = id;
            nlohmann::json reply = sendAndRecv(request, sockets[id].second, 0);
            if (reply["ans"] == "ok") {
                std::cout << "Ok" << std::endl;
            }
        } else if (command == "remove") {
            int id;
            std::cin >> id;
            request["type"] = "remove";
            request["id"] = id;
            nlohmann::json reply = sendAndRecv(request, sockets[id].second, 0);
            destroySock(sockets[id].first, sockets[id].second);
            sockets.erase(id);
            std::cout << "Ok" << std::endl;
        } else if (command == "shift") {
            int id;
            std::string vct;
            std::cin >> id >> vct;
            request["type"] = "shift";
            request["id"] = id;
            request["vct"] = vct;
            nlohmann::json reply = sendAndRecv(request, sockets[id].second, 0);
            if (reply["ans"] == "ok") {
                std::cout << "Ok" << std::endl;
            }
        } 
    }
    return 0;
}
