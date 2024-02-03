
import {createContext} from 'react';
import {User, Move} from '../types';


type UserContextType = {
  user?: User;
  virtualBoard: Move[][];
  login: (username: string, password: string)=> Promise<true | string>;
  register: (username: string, password: string)=> Promise<true | string>;
  getVirtualBoard: (width:number)=> Promise<true | string>;
  logout: ()=> void;
}

const UserContext = createContext<UserContextType>({} as UserContextType );

export default UserContext;