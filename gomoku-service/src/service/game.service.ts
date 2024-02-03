import mongoose, { DocumentDefinition } from 'mongoose'
import GameModel, { GameDocument } from '../model/game.model'



export async function storeGame(game: DocumentDefinition<GameDocument>) {
  return GameModel.create(game)
}

export async function findAllGamesByUserId(id: string){
  return await GameModel.find({ userId: new mongoose.Types.ObjectId(id) }).lean();
}

export async function findGameById(id: string){
  return await GameModel.findById({ _id: new mongoose.Types.ObjectId(id)});
}