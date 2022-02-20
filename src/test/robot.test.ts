import Robot from "../components/robot";
import Table from "../components/table";
import { ICommand, ICommandParams } from "../models/command.model";
import { Direction } from "../models/direction.model";

describe('Robot', () => {
    let robot: Robot;
    beforeAll(() => {
        robot = new Robot(new Table(5, 5));
    });

    beforeEach(() => {
        robot.doPlace({position: {x: 2, y: 2}, direction: Direction.North});
    });

    describe('doPlace', () => {
        it('should set position and direction correctly', () => {
            const params = {position: {x: 1, y: 3}, direction: Direction.East} as ICommandParams;
            robot.doPlace(params);
            expect(robot.report()).toEqual('Current position: 1, 3, EAST');
        });

        it('should ignore invalid PLACE command (out of scope) and not set anything', () => {
            const params = {position: {x: 1, y: 30}, direction: Direction.West} as ICommandParams;
            robot.doPlace(params);
            expect(robot.report()).toEqual('Current position: 2, 2, NORTH');
        });
    });

    describe('doMove', () => {
        it('should set position correctly', () => {
            robot.doMove();
            expect(robot.report()).toEqual('Current position: 2, 3, NORTH');
        });

        it('should ignore invalid MOVE command (out of scope) and not set anything', () => {
            const params = {position: {x: 4, y: 3}, direction: Direction.East} as ICommandParams;
            robot.doPlace(params);
            robot.doMove();
            expect(robot.report()).toEqual('Current position: 4, 3, EAST');
        });
    });

    describe('doTurn', () => {
        it('should set direction correctly for LEFT', () => {
            robot.doTurn('LEFT');
            expect(robot.report()).toEqual('Current position: 2, 2, WEST');
        });

        it('should set direction correctly for RIGHT', () => {
            robot.doTurn('RIGHT');
            expect(robot.report()).toEqual('Current position: 2, 2, EAST');
        });
    });

    describe('report', () => {
        it('should report current position and direction correctly', () => {
            expect(robot.report()).toEqual('Current position: 2, 2, NORTH');
        });
    });
});

describe('Robot executeCommand', () => {
    let robot: Robot;
    beforeAll(() => {
        robot = new Robot(new Table(5, 5));
    });

    it('should call doPlace', () => {
        const command = {
            command: 'PLACE',
            params: {
                position: {
                    x: 1,
                    y: 3
                },
                direction: 'EAST'
            }
        } as ICommand;
        robot.doPlace = jest.fn();
        robot.executeCommand(command);
        expect(robot.doPlace).toHaveBeenCalled();
    });

    it('should not call doPlace due to missing params', () => {
        const command = {
            command: 'PLACE',
        } as ICommand;
        robot.doPlace = jest.fn();
        robot.executeCommand(command);
        expect(robot.doPlace).toHaveBeenCalledTimes(0);
    });

    it('should call doMove', () => {
        const command = {
            command: 'MOVE',
        } as ICommand;
        robot.doMove = jest.fn();
        robot.executeCommand(command);
        expect(robot.doMove).toHaveBeenCalled();
    });

    it('should call doTurn for LEFT', () => {
        const command = {
            command: 'LEFT',
        } as ICommand;
        robot.doTurn = jest.fn();
        robot.executeCommand(command);
        expect(robot.doTurn).toHaveBeenCalled();
    });

    it('should call doTurn for RIGHT', () => {
        const command = {
            command: 'RIGHT',
        } as ICommand;
        robot.doTurn = jest.fn();
        robot.executeCommand(command);
        expect(robot.doTurn).toHaveBeenCalled();
    });

    it('should call report', () => {
        const command = {
            command: 'REPORT',
        } as ICommand;
        robot.report = jest.fn();
        robot.executeCommand(command);
        expect(robot.report).toHaveBeenCalled();
    });
});