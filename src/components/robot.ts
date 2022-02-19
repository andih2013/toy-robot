import { Command, ICommand, ICommandParams } from "../models/command.model";
import { Direction } from "../models/direction.model";
import { IPosition } from "../models/position.model";
import Table from "./table";

export default class Robot {
    private position: IPosition;
    private direction: Direction;
    private table: Table;

    constructor(table: Table, posX = 0, posY = 0, direction = Direction.North) {
        this.table = table;
        this.position = {x: posX, y: posY};
        this.direction = direction;
    }

    public executeCommand(command: ICommand) {
        switch(command.command) {
            case Command.Place:
                if (command.params) {
                    this.doPlace(command.params);
                }
                break;
            case Command.Move:
                this.doMove();
                break;
            case Command.Left:
                this.doTurn('LEFT');
                break;
            case Command.Right:
                this.doTurn('RIGHT');
                break;
            case Command.Report:
                this.report();
                break;
            default:
                break;
        }
    }

    public doPlace(params: ICommandParams) {
        if (this.table.isOutOfScope(params.position)) {
            // Ignore command if out of scope
            console.log('New position is out of scope. Command ignored.')
            return;
        }
        this.position.x = params.position.x;
        this.position.y = params.position.y;
        this.direction = params.direction;
    }

    public doMove() {
        let newPosition = {x: this.position.x, y: this.position.y};
        switch(this.direction) {
            case Direction.North:
                ++newPosition.y;
                break;
            case Direction.East:
                ++newPosition.x;
                break;
            case Direction.South:
                --newPosition.y;
                break;
            case Direction.West:
                --newPosition.x;
                break;
            default:
                break;
        }
        if (!this.table.isOutOfScope(newPosition)) {
            this.position = newPosition;
        } else {
            console.log('New position is out of scope. Command ignored.')
        }
    }

    public doTurn(dir: 'LEFT' | 'RIGHT') {
        let newDir = this.direction;
        switch(this.direction) {
            case Direction.North:
                newDir = dir === 'LEFT' ? Direction.West : Direction.East;
                break;
            case Direction.East:
                newDir = dir === 'LEFT' ? Direction.North : Direction.South;
                break;
            case Direction.South:
                newDir = dir === 'LEFT' ? Direction.East : Direction.West;
                break;
            case Direction.West:
                newDir = dir === 'LEFT' ? Direction.South : Direction.North;
                break;
            default:
                break;
        }
        this.direction = newDir;
    }


    public report() {
        const reportMessage = `Report position: ${this.position.x}, ${this.position.y}, ${this.direction}`;
        console.log(reportMessage);
        return reportMessage;
    }
}