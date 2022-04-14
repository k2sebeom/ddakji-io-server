import Vector from "./utils/Vector";
import * as fs from 'fs';


const ddakjiFile = fs.readFileSync(__dirname + '/../assets/ddakjis.json');
const ddakjiInfo = JSON.parse(ddakjiFile.toString());

class Ddakji {
    public id: number;
    public resistance: number;
    public power: number;
    public weakPoints: Vector[];

    private THRES: number = 500;

    constructor(id: number) {
        this.id = id;
        const info = ddakjiInfo[id];
        this.resistance = info.resistance;
        this.power = info.power;
        const weakCount = info.weak_points;
        this.weakPoints = [];
        for(let i = 0; i < weakCount; i++) {
            this.weakPoints.push(new Vector(Math.random(), Math.random()));
        }
    }

    public attack(other: Ddakji, pt: Vector): boolean {
        let Peff = 0;
        for(const w of other.weakPoints) {
            const P = this.power / other.resistance / pt.r2(w);
            Peff = Math.max(Peff, P);
        }
        return Peff > this.THRES;
    }
}

export default Ddakji;