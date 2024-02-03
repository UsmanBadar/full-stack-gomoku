import express, {Express, Request, Response} from 'express';
import authHandler from './handler/auth.handler';
import gameHandler from './handler/game.handler';
import gameHistoryHandler from './handler/gameHistory.handler'


const app: Express = express();
app.use(express.json());


app.use('/api/auth', authHandler);
app.use('/api/game', gameHandler);
app.use('/api/game-history', gameHistoryHandler)

export default app;