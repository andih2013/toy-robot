import { IPosition } from "../models/position.model";

export default class Table {
    private sizeX: number;
    private sizeY: number;

    constructor(sizeX = 5, sizeY = 5) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    public isOutOfScope(postion: IPosition): boolean {
        return postion.x < 0 || postion.y < 0 || postion.x > (this.sizeX - 1) || postion.y > (this.sizeY - 1);
    }
}