import express, {Request, Response} from 'express';
import {findAllGamesByUserId, findGameById} from '../service/game.service';
import { deserializeUser } from '../middleware/deserializeUser';

const gameHistoryHandler = express.Router();
gameHistoryHandler.use(deserializeUser);

gameHistoryHandler.get('/all-games', async (req: Request, res: Response)=>{
    try{
        const id = req.userId;
        const allGames = await findAllGamesByUserId(id);
        res.status(200).send(allGames);
    }catch(error){
        res.status(500).send('Can not fetch games, try again');
    }
});

gameHistoryHandler.get('/game-log/:id', async (req: Request, res: Response)=>{
    try{
        const id = req.params.id;
        const gameLog = await findGameById(id);
        res.status(200).send(gameLog);
    }catch(error){
        res.status(500).send('Can not fetch game, try again');
    }
});


export default gameHistoryHandler;