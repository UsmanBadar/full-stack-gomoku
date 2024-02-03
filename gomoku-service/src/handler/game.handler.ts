import { gameStateSchema } from './../schema/gameState.schema';
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import validateSchema from '../middleware/validateSchema';
import { boardInputSchema} from '../schema/boardInput.schema';
import checkGameStatus from '../util/checkGameStatus';
import { storeGame} from '../service/game.service'
import { deserializeUser } from '../middleware/deserializeUser';


const gameHandler = express.Router();
gameHandler.use(deserializeUser);



gameHandler.post('/create-game', validateSchema(boardInputSchema), (req: Request, res: Response)=>{
    try{
        const boardWidth = parseInt(req.body.boardInput);
        if(boardWidth >= 5 && boardWidth <= 19){
           const virtualBoard = new Array(boardWidth).fill([]).map(() => 
            new Array(boardWidth).fill({player: "", turn: 0}));
            res.status(200).send(virtualBoard);
        }else{
            res.status(400).send('Enter an integer between 5 and 19')
        }
    }catch(error){
        res.status(500).send('Unable to start game, please try again')
    }
});

gameHandler.put('/update-game-status', validateSchema(gameStateSchema), (req: Request, res: Response)=>{
    try{
        const {virtualBoard, player} = req.body;
        const updatedResult = checkGameStatus(virtualBoard, player);
        res.status(200).send({virtualBoard, player, result: updatedResult});
        
    }catch(error){
        res.status(500).send('Unable to update the game status');
    }
});

gameHandler.post('/store-game', validateSchema(gameStateSchema), async(req: Request, res: Response)=>{
    try{
        const {virtualBoard, result} = req.body;
        const date = new Date().toDateString();
        const savedGame = await storeGame({userId: new mongoose.Types.ObjectId(req.userId), date: date, result: result, board: virtualBoard});
        res.status(200).send(savedGame);
    }catch(error){
        res.status(500).send('Unable to store game');
    }
} )

export default gameHandler;