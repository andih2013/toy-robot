import { Command, ICommand, ICommandParams } from "../models/command.model";
import { Direction } from "../models/direction.model";
import { IPosition } from "../models/position.model";
import Table from "./table";

export default class Robot {
    private position: IPosition;
    private direction: Direction;
    private table: Table;

    /**
     * Constructor
     * @param table 
     * @param posX 
     * @param posY 
     * @param direction 
     */
    constructor(table: Table, posX = 0, posY = 0, direction = Direction.North) {
        this.table = table;
        this.position = {x: posX, y: posY};
        this.direction = direction;
    }

    /**
     * Execute given command
     * @param command given command object
     * @returns 
     */
    public executeCommand(command: ICommand): void {
        const paramsLine = command.command === Command.Place ? `${command.params?.position.x}, ${command.params?.position.y}, ${command.params?.direction}` : '';
        console.log(`>>> ${command.command} ${paramsLine}`);
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

    /**
     * Execute PLACE command with params, and update robot postion and direction if not out of scope
     * @param params required params for PLACE command
     */
    public doPlace(params: ICommandParams): void {
        if (this.table.isOutOfScope(params.position)) {
            // Ignore command if out of scope
            return;
        }
        this.position.x = params.position.x;
        this.position.y = params.position.y;
        this.direction = params.direction;
    }

    /**
     * Execute MOVE command, and update robot postion if not out of scope
     */
    public doMove(): void {
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
            console.log(`New position is out of scope. Command line (MOVE) ignored.`);
        }
    }

    /**
     * Execute LEFT/RIGHT command, and update robot direction
     * @param dir turning direction
     */
    public doTurn(dir: 'LEFT' | 'RIGHT'): void {
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

    /**
     * Execute REPORT command, and print out current position and direction
     * @returns current position
     */
    public report(): string {
        const reportMessage = `Current position: ${this.position.x}, ${this.position.y}, ${this.direction}`;
        console.log(reportMessage);
        return reportMessage;
    }
}