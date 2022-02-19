import CommandReader from '../components/command-reader';
import { Command, ICommand } from '../models/command.model';

describe('CommandReader', () => {
    describe('getCommandSequence', () => {
        it('should return command sequence', () => {
            const commandSeq = CommandReader.getCommandSequence('command-seq.txt');
            console.log('test commandSeq: ', commandSeq);
            expect(commandSeq.length).toBeGreaterThan(0);
        });

        it('should return nothing when file does not exist', () => {
            const commandSeq = CommandReader.getCommandSequence('not-exist-file.txt');
            console.log('test commandSeq: ', commandSeq);
            expect(commandSeq.length).toBe(0);
        });
    });

    describe('parseCommand', () => {
        it('should return correct command', () => {
            const command = CommandReader.parseCommand('PLACE 1,3,EAST');
            expect(command).toEqual(
                {
                    command: 'PLACE',
                    params: {
                        position: {
                            x: 1,
                            y: 3
                        },
                        direction: 'EAST'
                    }
                }
            );
        });

        it('should return correct command ignoring extra whitespaces and accepting lowercase', () => {
            const command = CommandReader.parseCommand('  place   2,  3,  north  ');
            expect(command).toEqual(
                {
                    command: 'PLACE',
                    params: {
                        position: {
                            x: 2,
                            y: 3
                        },
                        direction: 'NORTH'
                    }
                }
            );
        });

        it('should return nothing for invalid command', () => {
            const command = CommandReader.parseCommand('INVALID_COMMAND');
            expect(command).toBeFalsy();
        });

        it('should return nothing for valid command without required params', () => {
            const command = CommandReader.parseCommand('PLACE');
            expect(command).toBeFalsy();
        });

        it('should return nothing for valid command with invalid position params', () => {
            const command = CommandReader.parseCommand('PLACE 1,WEST');
            expect(command).toBeFalsy();
        });

        it('should return nothing for valid command with invalid direction params', () => {
            const command = CommandReader.parseCommand('PLACE 1,3,INVALID_DIRECTION');
            expect(command).toBeFalsy();
        });
    });
});