cmake_minimum_required(VERSION 3.20)
project(main LANGUAGES CXX)

find_package(OpenCV 4.2 REQUIRED)
find_package(nadjieb_mjpeg_streamer REQUIRED)

include_directories(${OpenCV_INCLUDE_DIRS})

add_executable(api api.cpp)
target_compile_options(api PUBLIC -g)
target_link_options(api PUBLIC -g)
add_executable(handler handler.cpp)
target_compile_options(api PUBLIC -g)
target_link_options(api PUBLIC -g)

target_link_libraries(api PRIVATE zmq)
target_link_libraries(handler PRIVATE zmq nadjieb_mjpeg_streamer::nadjieb_mjpeg_streamer
                     ${OpenCV_LIBS})
