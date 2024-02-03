import {Move} from './Move';

export type GameState = {
    virtualBoard: Move[][];
    player: string;
    //result: string;
}