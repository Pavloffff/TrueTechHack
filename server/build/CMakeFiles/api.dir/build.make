# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.22

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/ggame/developing/TrueTechHack/t1/TrueTechHack/server

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/ggame/developing/TrueTechHack/t1/TrueTechHack/server/build

# Include any dependencies generated for this target.
include CMakeFiles/api.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/api.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/api.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/api.dir/flags.make

CMakeFiles/api.dir/api.cpp.o: CMakeFiles/api.dir/flags.make
CMakeFiles/api.dir/api.cpp.o: ../api.cpp
CMakeFiles/api.dir/api.cpp.o: CMakeFiles/api.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/ggame/developing/TrueTechHack/t1/TrueTechHack/server/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/api.dir/api.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/api.dir/api.cpp.o -MF CMakeFiles/api.dir/api.cpp.o.d -o CMakeFiles/api.dir/api.cpp.o -c /home/ggame/developing/TrueTechHack/t1/TrueTechHack/server/api.cpp

CMakeFiles/api.dir/api.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/api.dir/api.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/ggame/developing/TrueTechHack/t1/TrueTechHack/server/api.cpp > CMakeFiles/api.dir/api.cpp.i

CMakeFiles/api.dir/api.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/api.dir/api.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/ggame/developing/TrueTechHack/t1/TrueTechHack/server/api.cpp -o CMakeFiles/api.dir/api.cpp.s

# Object files for target api
api_OBJECTS = \
"CMakeFiles/api.dir/api.cpp.o"

# External object files for target api
api_EXTERNAL_OBJECTS =

api: CMakeFiles/api.dir/api.cpp.o
api: CMakeFiles/api.dir/build.make
api: CMakeFiles/api.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/ggame/developing/TrueTechHack/t1/TrueTechHack/server/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable api"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/api.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/api.dir/build: api
.PHONY : CMakeFiles/api.dir/build

CMakeFiles/api.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/api.dir/cmake_clean.cmake
.PHONY : CMakeFiles/api.dir/clean

CMakeFiles/api.dir/depend:
	cd /home/ggame/developing/TrueTechHack/t1/TrueTechHack/server/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/ggame/developing/TrueTechHack/t1/TrueTechHack/server /home/ggame/developing/TrueTechHack/t1/TrueTechHack/server /home/ggame/developing/TrueTechHack/t1/TrueTechHack/server/build /home/ggame/developing/TrueTechHack/t1/TrueTechHack/server/build /home/ggame/developing/TrueTechHack/t1/TrueTechHack/server/build/CMakeFiles/api.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/api.dir/depend

