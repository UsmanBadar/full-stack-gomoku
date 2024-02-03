import React, {useContext} from 'react';
import style from './Header.module.css';
import {UserContext} from '../context';
import {useLocation, useNavigate} from 'react-router-dom';

//Header page of the app
export default function Header() {
    const {user, logout} = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

  return (
    <div>
    <nav className = {style.nav}>
        <div className={style.banner} onClick = {()=>navigate('/')}>
            <h1>Gomoku</h1>
        </div>
        <ul className={style.navList}>
            {!user  && location.pathname !== '/login' &&
                <li className={style.navListItem} onClick={()=> navigate('login')}>Log In </li>}
            {!user && location.pathname !== '/login' &&
              <li className={style.navListItem}> | </li> }
            {!user &&   
                <li className={style.navListItem} onClick={()=> navigate("sign-up")}> Sign Up</li>}
            {location.pathname === '/' && user && 
                <li className= {style.navListItem} onClick = {()=>navigate('games')}>Previous Games </li>}
            {location.pathname === '/' && user && 
                <li className= {style.navListItem} onClick = {()=>navigate('games')}>|</li>}
            {location.pathname === '/' && user && 
                <li className= {style.navListItem} onClick = {()=> logout()}> Log Out</li>}
        </ul>
      </nav>
    </div> 
  );
}
