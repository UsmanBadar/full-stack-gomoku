import React, { useState, useEffect, useReducer, useContext } from 'react';
import { UserContext } from '../context';
import  {Square, Message} from '../components';
import {post, put} from '../utilis/http';
import style from './Game.module.css';
import { useNavigate, Navigate } from 'react-router-dom';
import {PlayerAction,GameState, GameServerRes, GameReset} from '../types';


 function reducer(state: GameState, action: PlayerAction): GameState{
  const { player, turn, row, column } = action;
  let newState= state;
  newState['virtualBoard'][row][column] = {player, turn}
  newState['player'] = player;
  state = {...newState}
  return state;
}

export default function Game(props:GameReset) {
  const {gameKey, setGameKey} = props;
  const [completed, setCompleted] = useState<boolean>(false);
  const [result, setResult] = useState<string>('')
  const [player, setPlayer] = useState<string>('black');
  const [turn, setTurn] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const {user, virtualBoard} = useContext(UserContext);
  const navigate = useNavigate();

  const initialState : GameState = {virtualBoard:new Array(virtualBoard.length).fill([]).map(() => 
    new Array(virtualBoard.length).fill({player: "", turn: 0})), player: ''};

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateGameStatus = async (move: GameState)=>{
    try{
      setLoading(true);
      const game: GameServerRes ={...move, result: result};
      const response = await put<GameServerRes, GameServerRes>('/api/game/update-game-status', game);
      setResult(response.result);
      setLoading(false);
    }catch(error){
      if(error instanceof Error){
        return error.message;
      }else{
        return 'Unable to update game status, please restart game';
      }
    }
  }
  
  const storeGame = async (completedGame:GameState)=>{
    try{
      const game: GameServerRes ={...completedGame, result: result};
      await post<GameServerRes, GameServerRes>('/api/game/store-game', game)
    }catch(error){
      if(error instanceof Error){
        return error.message;
      }else{
        return 'Unable to store game at this time, please try again';
      }
    }
  }

  useEffect(()=>{
    if(state['virtualBoard'].length === 1){return }
    updateGameStatus(state);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(()=>{
    if (result === 'continue'){
      setCompleted(false);
    }else if (result === 'Unable to update the game status'){
      setCompleted(false)
    }else{
      setCompleted(true);
    }
  },[result])
  

  const handleLeaveClick = async ()=>{
    if(completed){
      await storeGame(state);
      navigate('/games');
    }else{
      navigate('/');
    }
  } 
  if(!user){return <Navigate to='/' replace />}
  if(virtualBoard.length === 1){ return <Navigate to='/' replace />}
  
  return ( 
    <div className= {`${style.gameContainer} ${loading && style.loading}`} >
      <div  className={style.gameMessage}>
        {completed && <Message variant='info' message ={result} />}
        {!completed && <Message variant='info' message ={!loading && `Current Player: ${player[0].toUpperCase()}${player.substring(1)}`} />}
      </div>
      <div className={`${style.gameBoard} ${completed && style.completed}`}>
        {[...Array(virtualBoard.length)].map((_, row) =>
          <div key={row} className = {style.gameRow}>
          {[...Array(virtualBoard.length)].map((_, column) => (
            <Square
              key={`${row}-${column}`}
              row={row}
              column={column}
              selected={false}
              player={player}
              setPlayer={setPlayer}
              turn={turn}
              setTurn={setTurn}
              dispatch={dispatch}
            />
          ))}
          </div>
        )}
        </div>
        <div className={style.gameButtons}>
          <div className={style.gameButtonLeave}>
            <button onClick = {()=> handleLeaveClick()}>Leave</button>
          </div>
          <div className={style.gameButtonReset}>
            <button onClick = {()=>{setGameKey(gameKey + 1);}}>Reset</button>
          </div>
        </div>
    </div>
  );
}

