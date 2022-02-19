import * as fs from 'fs';
import { EOL } from 'os';
import { Command, ICommand, ICommandParams } from "../models/command.model";
import { Direction } from "../models/direction.model";

export default class CommandReader {
    public static getCommandSequence(fileName: string): string[] {
        // Check file existing or not
        if (!fs.existsSync(fileName)) {
            console.log('Can not open file.')
            return [];
        }

        const commandLines = fs.readFileSync(fileName, 'utf8').split(EOL);
        return commandLines;
    }

    public static parseCommand(line: string): ICommand | null {
        if (!line) {
            console.log('Empty line.');
            return null;
        }
        // Remove extra whitespaces
        const trimmedLine = line.replace(/\s+/g, ' ').trim();
        const commandParts = trimmedLine.split(' ');
        if (!commandParts[0]) {
            console.log('Invalid command.');
            return null;
        }

        let parsedCommand = null;
        switch(commandParts[0].toUpperCase()) {
            case Command.Place:
                // Get position and direction
                const paramsString = trimmedLine.substring(commandParts[0].length).replace(/\s+/g, '');
                const parsedParams = this.parseCommandParams(paramsString);
                if (parsedParams) {
                    parsedCommand = {command: Command.Place, params: parsedParams} as ICommand;
                }
                break;
            case Command.Move:
            case Command.Left:
            case Command.Right:
            case Command.Report:
                parsedCommand = {command: commandParts[0].toUpperCase()} as ICommand;
                break;
            default:
                // Invalid command
                console.log('Invalid command');
                return null;
        }
        return parsedCommand;
    }

    private static parseCommandParams(paramsLine: string): ICommandParams | null {
        if (!paramsLine) {
            console.log('Empty params');
            return null;
        }
        console.log('paramsLine: ', paramsLine);
        const paramList = paramsLine.split(',');
        console.log('paramList: ', paramList);
        let parsedDirection;
        switch(paramList[2]?.toUpperCase()) {
            case Direction.East:
            case Direction.South:
            case Direction.West:
            case Direction.North:
                parsedDirection = paramList[2].toUpperCase() as Direction;
                break;
            default:
                // Invalid direction
                console.log('Invalid direction: ', paramList[2]?.toUpperCase());
                return null;
        }
        if (isNaN(parseInt(paramList[0])) || isNaN(parseInt(paramList[1]))) {
            // Invalid position
            console.log('Invalid position');
            return null;
        }
        return {position: {x: parseInt(paramList[0]), y: parseInt(paramList[1])}, direction: parsedDirection} as ICommandParams;
    }
}