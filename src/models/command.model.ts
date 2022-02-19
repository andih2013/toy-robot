import { Direction } from "./direction.model";
import { IPosition } from "./position.model";

export interface ICommand {
    command: Command;
    params?: ICommandParams;
}

export interface ICommandParams {
    position: IPosition;
    direction: Direction;
}

export const enum Command {
    Place = 'PLACE',
    Move = 'MOVE',
    Left = 'LEFT',
    Right = 'RIGHT',
    Report = 'REPORT',
}