import { Move } from "./Move";

export type GameLogType = {
    _id: string;
    userId: string;
    result: string;
    date: string;
    board: Move[][];
}