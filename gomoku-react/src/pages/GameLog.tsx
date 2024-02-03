import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../context';
import {SquareLog} from '../components';
import {Move, GameLogType} from '../types';
import {get} from '../utilis/http';
import {useParams, useNavigate, Navigate} from 'react-router-dom';
import style from './GameLog.module.css';


export default function GameLog() {
  const [gameLog, setGameLog] = useState<Move[][]> ([] as Move[][]);
  const [result, setResult] = useState<string>('');
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();
  const id :string = params.id || "";

  const getGameLog = async(id: string)=>{
    try{
      const response: GameLogType = await get(`/api/game-history/game-log/${id}`);
      setGameLog(response['board']);
      setResult(response['result']);
      return response;
    }catch(error){
      if (error instanceof Error){
        return error.message;
      }else{
        return 'Unable to retrieve game log, please try again';
      }
    }
  }

  useEffect(()=>{
    getGameLog(id);
  }, [id]);
  

  if(!user){return <Navigate to='/login' replace />}
  
  return(
    <>
      <div className={style.gameLogContainer}>
        <p>{result}</p>
      <div className = {style.gameLogBoard}>
        {gameLog.map((gameLogItem, row) =>
          <div key={row} className = {style.gameLogRow}>
          {gameLogItem.map((itemObject, column) => (
            <div key={column} className ={style.gameLogColumn} >
            <SquareLog
              key={`${row}-${column}`}
              player = {itemObject['player']}
              turn = {itemObject['turn']}/>
          </div>))}
      </div>)}
      </div>
      <div className = {style.gameButtons}>
        <button onClick = {()=> navigate('/')}>Back</button>
      </div>
      </div>
    </>
  ) 
}
        
