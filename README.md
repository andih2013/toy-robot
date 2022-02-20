# Toy Robot

### Description
- This is a console application
- The application is to simulate a robot moving on a table (size of 5 * 5)
- The application gets commands from the given .txt file (default file name is `command-seq.txt`) located in the project root folder
- The application accepts PLACE, MOVE, LEFT, RIGHT and REPORT commands

### Command format requirements
- Each line contains only one command
- PLACE command requires params of position X, position Y and direction
- PLACE command and params are separated by whitespace(s)
- Params are separated by comma
- Extra whitespaces in a line will be ignored
- Commands and params are case-insensitive
- Out-of-scope action (by PLACE or MOVE) will be ignored, and will jump to the next command
- Empty lines will be ignored

#### Valid command examples
```
PLACE 2,3,NORTH
place 2,3,north
  PLACE   2,  4,  EAST
MOVE
LEFT
RIGHT
REPORT
```

#### Invalid command examples
```
PLACE -2,3,NORTH
PLACE 2,10,NORTH
PLACE 2,EAST
PLACE 2,2,INVALID_DIRECTION
PLACE
INVALID_COMMAND
```

### Setup Application
#### Clone the repo and install packages
```
$ git clone git@github.com:andih2013/toy-robot.git
$ cd toy-robot
$ npm install
```

#### Create the command file
Create a file (e.g. `command-seq.txt`) with commands in the project root folder. Below is an example
```
PLACE 0,0,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
RIGHT
RIGHT
MOVE
MOVE
REPORT
INVALID
PLACE 2,3,WES
PLACE 2,WEST
PLACE
place -1,1,north
RIGHT
MOVE
MOVE
LEFT
REPORT
```

#### Run the application
```
$ npm start
```
with the default file name `command-seq.txt`
or
```
npm start command-seq.txt
```

#### Check the output
Below is the output of the above example
```
>>> PLACE 0, 0, EAST
>>> MOVE
>>> MOVE
>>> LEFT
>>> MOVE
>>> REPORT
Current position: 2, 1, NORTH
>>> RIGHT
>>> RIGHT
>>> MOVE
>>> MOVE
New position is out of scope. Command line (MOVE) ignored.
>>> REPORT
Current position: 2, 0, SOUTH
Invalid command. Command line (INVALID) ignored.
Invalid command params. Command line (PLACE 2,3,WES) ignored.
Invalid command params. Command line (PLACE 2,WEST) ignored.
Invalid command params. Command line (PLACE) ignored.
>>> PLACE -1, 1, NORTH
>>> RIGHT
>>> MOVE
>>> MOVE
>>> LEFT
>>> REPORT
Current position: 0, 0, SOUTH
```

#### Run unit test
```
npm run test
```