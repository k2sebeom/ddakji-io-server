import { Router, Request, Response } from 'express';
import * as fs from 'fs';

const ddakjiFile = fs.readFileSync(__dirname + '/../../game/assets/ddakjis.json');
const ddakjiInfo = JSON.parse(ddakjiFile.toString());

const route = Router();

export default (app: Router) => {
    app.use('/ddakji', route);

    route.get('/', (req: Request, res: Response) => {
        res.send({ data: ddakjiInfo });
    });

    route.get('/:id', (req: Request, res: Response) => {
        const params = req.params;
        res.send({ data: ddakjiInfo[params.id] });
    });
}