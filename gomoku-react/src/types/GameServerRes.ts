import {Move} from './Move';

export type GameServerRes = {
    virtualBoard: Move[][];
    player: string;
    result: string;
}