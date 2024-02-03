import { User, Credential, Move} from '../types';
import {useState} from 'react';
import {UserContext} from '../context';
import {useLocalStorage} from '../hooks';
import {post, setToken} from '../utilis/http';

type UserProviderProps = {
  children: React.ReactNode;
}


export default function UserProvider({children}: UserProviderProps){
  const [user, setUser] = useLocalStorage <User| undefined>('user',undefined);
  const [virtualBoard, setVirtualBoard] = useState<Move[][]>([[]] as Move[][]);

  if (user){
    setToken(user.token);
  }

  const login = async (username: string, password: string)=>{
    try{
      const user = await post<Credential, User>('/api/auth/login', {
        username,
        password,
      });
      setUser(user);
      setToken(user.token);
      return true;
    }catch(error){
      if(error instanceof Error){
        return error.message;
      }
      return 'Unable to login at this moment, please try again'
    }
  }

  const register = async (username: string, password: string)=>{
    try{
      const user = await post<Credential, User>('/api/auth/register', {
        username,
        password,
      });
      setUser(user);
      setToken(user.token);
      return true;
    }catch(error){
      if(error instanceof Error){
        return error.message;
      }
      return 'Unable to login at this moment, please try again'
    }
  }

  const getVirtualBoard = async (boardInput:number)=>{
    try{
      const board= await post<{boardInput: number}, Move[][]>('/api/game/create-game',{
        boardInput
      });
      setVirtualBoard(board);
      return true;
    }catch(error){
      if(error instanceof Error){
        return error.message;
      }
      return 'Unable to start game at this moment, please try again'
    }
  }

  const logout = ()=>{
    setUser(undefined);
    setToken('');
  }
  

  return (
    <UserContext.Provider value={{user, virtualBoard, login, register, getVirtualBoard, logout}}>
      {children}
    </UserContext.Provider>
  )
}