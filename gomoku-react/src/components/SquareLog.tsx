import React from 'react'
import style from './SquareLog.module.css';
import {SquareLogPropsType} from '../types';



export default function SquareLog(props:SquareLogPropsType) {
    const {player, turn} = props;
    
    
    return ( 
      <div className= {`${style.squareLog} ${style[player]}`}><p className = {style.turnNum}>{turn !==0 && turn}</p></div> 
    )
  }