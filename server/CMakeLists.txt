cmake_minimum_required(VERSION 3.1)

project(mjpeg_streamer CXX)

find_package(OpenCV 4.2 REQUIRED)
find_package(nadjieb_mjpeg_streamer REQUIRED)

include_directories(${OpenCV_INCLUDE_DIRS})

add_executable(main
  "main.cpp")
target_compile_features(main PRIVATE cxx_std_11)
target_link_libraries(main PRIVATE nadjieb_mjpeg_streamer::nadjieb_mjpeg_streamer
                     ${OpenCV_LIBS})