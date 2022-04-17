import Vector from "./utils/Vector";
import * as fs from 'fs';


const ddakjiFile = fs.readFileSync(__dirname + '/../assets/ddakjis.json');
const ddakjiInfo = JSON.parse(ddakjiFile.toString());


type MatchResultData = {
    result: boolean;
    x: number,
    y: number,
    force: number;
}

class Ddakji {
    public id: number;
    public resistance: number;
    public power: number;
    public weakPoints: Vector[];

    private THRES: number = 500;

    private randrange(a: number, b: number) {
        return a + (Math.random() * (b - a));
    }

    private getForceAmount(isWin: Boolean) {
        if(isWin) {
            return this.randrange(190, 250);
        }
        else {
            return this.randrange(150, 180);
        }
    }

    constructor(id: number) {
        this.id = id;
        const info = ddakjiInfo[id];
        this.resistance = info.resistance;
        this.power = info.power;
        const weakCount = info.weak_points;
        this.weakPoints = [];
        for(let i = 0; i < weakCount; i++) {
            this.weakPoints.push(new Vector(this.randrange(-1, 1), this.randrange(-1, 1)));
        }
        console.log(this.weakPoints);
    }

    public attack(other: Ddakji, pt: Vector): MatchResultData {
        let Peff = 0;
        for(const w of other.weakPoints) {
            const P = this.power / other.resistance / pt.r2(w);
            Peff = Math.max(Peff, P);
        }
        const result = Peff > this.THRES;
        const force = Math.floor(this.getForceAmount(result) / 10) * 10;
        return {
            result,
            x: pt.x,
            y: pt.y,
            force: Math.abs(pt.x) > 1 || Math.abs(pt.y) > 1 ? 0 : force
        };
    }
}

export default Ddakji;