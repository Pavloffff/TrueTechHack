#ifndef __TOOLS_H__
#define __TOOLS_H__

#include <unistd.h>
#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <string.h>
#include <unistd.h>
#include <csignal>
#include <queue>
#include <thread>
#include <zmq.hpp>
#include <nlohmann/json.hpp>

int WAIT_TIME = 1000;
int MINPORT = 5000;


void initSock(zmq::context_t &context, zmq::socket_t &socket)
{
    context = zmq::context_t();
    socket = zmq::socket_t(context, zmq::socket_type::pair);
    socket.setsockopt(ZMQ_RCVTIMEO, WAIT_TIME);
    socket.setsockopt(ZMQ_SNDTIMEO, WAIT_TIME);
}

void destroySock(zmq::context_t &context, zmq::socket_t &socket)
{
    socket.close();
    context.~context_t();
}

nlohmann::json sendAndRecv(nlohmann::json &request, zmq::socket_t &socket, int debug)
{
    std::string strFromJson = request.dump();
    if (debug) {
        std::cout << strFromJson << std::endl;
    }
    zmq::message_t msg(strFromJson.size());
    memcpy(msg.data(), strFromJson.c_str(), strFromJson.size());
    socket.send(msg);
    nlohmann::json reply;
    zmq::message_t msg2;
    socket.recv(msg2);
    std::string strToJson(static_cast<char *>(msg2.data()), msg2.size());
    if (!strToJson.empty()) {
        reply = nlohmann::json::parse(strToJson);
    }
    else {
        if (debug) {
            std::cout << "bad socket" << std::endl;
        }
        reply["ans"] = "error";
    }
    if (debug) {
        std::cout << reply << "\n";
    }
    return reply;
}

void Send(nlohmann::json &request, zmq::socket_t &socket)
{
    std::string strFromJson = request.dump();
    zmq::message_t msg(strFromJson.size());
    memcpy(msg.data(), strFromJson.c_str(), strFromJson.size());
    socket.send(msg);
}

nlohmann::json Recv(zmq::socket_t &socket)
{
    nlohmann::json reply;
    zmq::message_t msg;
    socket.recv(msg);
    std::string strToJson(static_cast<char *>(msg.data()), msg.size());
    reply = nlohmann::json::parse(strToJson);
    return reply;
}

#endif