import { PlayerAction } from "./PlayerAction";

export type SquarePropsType ={
    row : number;
    column : number;
    selected : boolean;
    player : string;
    setPlayer : React.Dispatch<React.SetStateAction<string>>;
    turn : number;
    setTurn : React.Dispatch<React.SetStateAction<number>>;
    dispatch: React.Dispatch<PlayerAction>;
  }