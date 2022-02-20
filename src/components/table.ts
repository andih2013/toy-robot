import { IPosition } from "../models/position.model";

export default class Table {
    private sizeX: number;
    private sizeY: number;

    /**
     * Constructor
     * @param sizeX 
     * @param sizeY 
     */
    constructor(sizeX = 5, sizeY = 5) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    /**
     * Check if the given position is out of scope
     * @param postion 
     * @returns boolean
     */
    public isOutOfScope(postion: IPosition): boolean {
        return postion.x < 0 || postion.y < 0 || postion.x > (this.sizeX - 1) || postion.y > (this.sizeY - 1);
    }
}