import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../context';
import {useNavigate, Navigate} from 'react-router-dom';
import {get} from '../utilis/http';
import style from './Games.module.css';

export default function Games() {
  const {user} = useContext(UserContext);
  const [games, setGames] = useState<[]>([]);
  const navigate = useNavigate();
 

  const getAllGames = async()=>{
    try{
    const response: [] = await get('/api/game-history/all-games');
    setGames(response);
    return response;
    }catch(error){
      if(error instanceof Error){
        return error.message;
      }else{
        return 'Unable to return games at this moment, please try again';
      }
    }
  }

  useEffect(()=>{
    getAllGames();
  }, []);

  if(!user){return <Navigate to='/login' replace />}
    
  if(games.length > 0){
    return (
      <>
      {games.map((game, index)=>
          <div className={style.gameLog} key={game['_id']} >
             <p className={style.gameLogMsg}>{`Game # ${index + 1} @ ${game['date']} Result: ${game['result']}`}</p>
             <button className={style.gameLogButton} onClick={() => navigate(`/game-log/${game['_id']}`)}>View game log</button>
          </div>
      )}
      </>
      )}else{
        return <div><p>There are no games in history</p></div>
      }
}
