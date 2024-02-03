import React, {useState} from 'react';
import style from './Square.module.css';
import {SquarePropsType} from '../types';


export default function Square(props : SquarePropsType ){
  const {row, column, selected, player, setPlayer, turn, setTurn, dispatch} = props;
  const [status, setStatus] = useState(
    selected? 'selected' : 'available'
  );
  const [playerOfSquare, setPlayerOfSquare] = useState<string>('');

  const handlePlayerClick = (row:number, column : number)=>{
    if(status === 'available'){
      dispatch({player, turn, row, column});
      setTurn(turn + 1);
      setStatus('selected');
      if(player==='black'){
        setPlayerOfSquare('black');
        setPlayer('white');
      }else if(player === 'white'){
        setPlayerOfSquare('white');
        setPlayer('black');
      }
    }else{
      return null;
    }
  }
  
  if(status === 'available'){ 
   return <div className={`${style.square} ${style.available}`}onClick = {()=>{handlePlayerClick(row, column)}}> </div> 
  }else if(status === 'selected' && playerOfSquare === 'black'){
    return <div className={`${style.square} ${style.black}`}> </div> 
  }else if(status === 'selected' && playerOfSquare === 'white'){
    return <div className={`${style.square} ${style.white}`}> </div>
  }else{
    return null;
  }
}