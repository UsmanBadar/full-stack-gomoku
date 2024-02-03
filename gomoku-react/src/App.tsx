import React, {useState} from 'react';
import {Header, Login, SignUp, Home, Game, Games, GameLog} from './pages';
import {UserProvider} from './components';
import {Routes, Route, Navigate} from 'react-router-dom';

import style from './App.module.css';




export default function App() {
  const [gameKey, setGameKey] = useState(1);
  return (
    <UserProvider>
        <Header/>
        <main className={style.main}>
          <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path = "login" element = {<Login/>} />
            <Route path = "sign-up" element = {<SignUp/>} />
            <Route path = "game" element = {<Game key = {gameKey} gameKey={gameKey} setGameKey={setGameKey} />} />
            <Route path = "games" element = {<Games/>} />
            <Route path = "game-log/:id" element = {<GameLog/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
    </UserProvider>
  );
}


