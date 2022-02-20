import Table from "../components/table";

describe('Table isOutOfScope', () => {
    let table: Table;
    beforeAll(() => {
        table = new Table(5, 5);
    });

    it('should return false', () => {
        const position = {x: 3, y: 3};
        expect(table.isOutOfScope(position)).toBeFalsy();
    });

    it('should return true for negative postion values', () => {
        const position = {x: -1, y: 3};
        expect(table.isOutOfScope(position)).toBeTruthy();
    });

    it('should return true for out-of-scope positive postion values', () => {
        const position = {x: 10, y: 30};
        expect(table.isOutOfScope(position)).toBeTruthy();
    });
});