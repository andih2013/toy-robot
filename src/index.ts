import CommandReader from "./components/command-reader";
import Robot from "./components/robot";
import Table from "./components/table";

// Get 1st arg, and ignore the rest
const myArgs = process.argv.slice(2, 3);

// default file name is command-seq.txt
const fileName = myArgs.length ? myArgs[0] : 'command-seq.txt';

const commandSeq = CommandReader.getCommandSequence(fileName);

const table = new Table(5, 5);
const robot = new Robot(table);

commandSeq.forEach((commandLine) => {
    const parsedCommand = CommandReader.parseCommand(commandLine);
    if (parsedCommand) {
        robot.executeCommand(parsedCommand);
    }
});
