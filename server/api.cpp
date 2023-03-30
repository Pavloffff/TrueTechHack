#include "tools.h"
#include "crow.h"

std::map<int, std::pair<zmq::context_t, zmq::socket_t>> sockets;

std::map<std::string, int> logins;
std::vector<int> ids;

// http://127.0.0.1:4999/create

int main(int argc, char const *argv[])
{
    crow::SimpleApp app;

    CROW_ROUTE(app, "/create").methods(crow::HTTPMethod::POST)([](const crow::request &req) {
        auto data = crow::json::load(req.body);
        if (!data) {
            return crow::response(400);
        }
        std::string login = data["login"].s();
        int id = 0, k = 0;
        for (int i = 0; i < ids.size(); i++) {
            if (ids[i] == 0) {
                ids[i] = 1;
                id = i;
                k = 1;
                break;
            }
        }
        if (k == 0) {
            id = ids.size();
            ids.push_back(1);
        }
        logins[login] = id;
        std::string filmName = data["filmName"].s();
        int port = MINPORT + id * 2;
        zmq::context_t context;
        zmq::socket_t socket;
        initSock(context, socket);
        socket.bind(("tcp://*:" + std::to_string(port)).c_str());
        int pid = fork();
        if (pid == 0) {
            execl("handler", "handler", std::to_string(port).c_str(), filmName.c_str(), NULL);
            return crow::response(201);
        }

        nlohmann::json request;
        request["type"] = "start";
        nlohmann::json reply = sendAndRecv(request, socket, 0);
        if (reply["ans"] == "ok") {
            sockets[id] = std::make_pair(std::move(context), std::move(socket));
            return crow::response{reply["port"].dump()};
        } else {
            destroySock(context, socket);
        } 
    });

    CROW_ROUTE(app, "/filter").methods(crow::HTTPMethod::POST)([](const crow::request &req) {
        auto data = crow::json::load(req.body);
        if (!data) {
            return crow::response(400);
        }
        std::string login = data["login"].s();
        int id = logins[login];
        std::string vct = data["vct"].s();
        std::string filterType = data["filterType"].s();
        nlohmann::json request;

        request["type"] = "filter";
        request["filterType"] = filterType;
        request["vct"] = vct;
        nlohmann::json reply = sendAndRecv(request, sockets[id].second, 0);
        if (reply["ans"] == "ok")
        {
            return crow::response(200);
        }
    });

    CROW_ROUTE(app, "/pause").methods(crow::HTTPMethod::POST)([](const crow::request &req) {
        auto data = crow::json::load(req.body);
        if (!data) {
            return crow::response(400);
        }
        std::string login = data["login"].s();
        int id = logins[login];
        nlohmann::json request;
        request["type"] = "pause";
        request["id"] = id;
        nlohmann::json reply = sendAndRecv(request, sockets[id].second, 0);
        if (reply["ans"] == "ok")
        {
            return crow::response(200);
        }
    });

    CROW_ROUTE(app, "/resume").methods(crow::HTTPMethod::POST)([](const crow::request &req) {
        auto data = crow::json::load(req.body);
        if (!data) {
            return crow::response(400);
        }
        std::string login = data["login"].s();
        int id = logins[login];

        nlohmann::json request;
        request["type"] = "resume";
        request["id"] = id;
        nlohmann::json reply = sendAndRecv(request, sockets[id].second, 0);
        if (reply["ans"] == "ok")
        {
            return crow::response(200);
        }
    });

    CROW_ROUTE(app, "/remove").methods(crow::HTTPMethod::POST)([](const crow::request &req) {
        auto data = crow::json::load(req.body);
        if (!data) {
            return crow::response(400);
        }
        std::string login = data["login"].s();
        int id = logins[login];

        nlohmann::json request;
        request["type"] = "remove";
        request["id"] = id;
        nlohmann::json reply = sendAndRecv(request, sockets[id].second, 0);
        destroySock(sockets[id].first, sockets[id].second);
        sockets.erase(id);
        logins.erase(login);
        ids[id] = 0;
        return crow::response(200);
    });

    CROW_ROUTE(app, "/shift").methods(crow::HTTPMethod::POST)([](const crow::request &req) {
        auto data = crow::json::load(req.body);
        if (!data) {
            return crow::response(400);
        }
        std::string login = data["login"].s();
        int id = logins[login];
        std::string vct = data["vct"].s();

        nlohmann::json request;
        request["type"] = "shift";
        request["id"] = id;
        request["vct"] = vct;
        nlohmann::json reply = sendAndRecv(request, sockets[id].second, 0);
        if (reply["ans"] == "ok")
        {
            return crow::response(200);
        }
    });
    app.port(MINPORT - 1).run();
    return 0;
}
