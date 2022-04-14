import { Router } from 'express';

import ddakji from './routes/ddakji';


// guaranteed to get dependencies
export default () => {
	const router = Router();

    ddakji(router);
	
	return router;
}