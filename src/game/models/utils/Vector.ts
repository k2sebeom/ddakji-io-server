


class Vector {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public distance(to: Vector): number {
        return Math.sqrt((this.x - to.x)**2 + (this.y - to.y)**2);
    }

    public r2(to: Vector): number {
        return (this.x - to.x)**2 + (this.y - to.y)**2;
    }
}

export default Vector;