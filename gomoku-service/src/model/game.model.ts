import mongoose, {Document} from 'mongoose';
import { UserDocument } from './user.model';
//import {Move} from '../types/Move';

export interface GameDocument extends Document {
    userId: UserDocument["_id"];
    result: string;
    date: string;
    board: [[Object]];
}

const gameSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, require: true,  ref: "users"},
    result : String,
    date: String,
    board: [[Object]],
});

export default mongoose.model<GameDocument>('games', gameSchema);