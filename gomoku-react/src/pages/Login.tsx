import React, {useState, useContext} from 'react';
import {Message, Input, Button} from '../components';
import {UserContext} from '../context';
import {useNavigate} from 'react-router-dom';
import style from './Login.module.css';

export default function Login(){
  const {login} = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [credentialsInvalid, setCredentialsInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleFormSubmit = async ()=>{
    setCredentialsInvalid(false);
    setErrorMessage('');
    const result = await login(username, password);
    setUsername("");
    setPassword("");
    console.log(result);
    if(result === true){
      navigate('/');
    }else{
      setCredentialsInvalid(true);
      setErrorMessage(result);
      setUsername("");
      setPassword("");
      }
    }

  return(
    <div className = {style.inputContainer}>
      <div className={style.inputMessage}>
    {credentialsInvalid && < Message variant="error" message = {errorMessage}/>}
      </div>
    <form className = {style.inputForm} onSubmit = {(e)=>{
      e.preventDefault();
      handleFormSubmit()
      }}>
      

      <Input
        name = "username"
        placeholder = "Username"
        value = {username}
        onChange = {(e)=>{setUsername(e.target.value); setCredentialsInvalid(false);}}
      />

      <Input
        name="password"
        placeholder = "Password"
        type= "password"
        value={password}
        onChange = {(e)=>{setPassword(e.target.value); setCredentialsInvalid(false);}}
      />
      <Button type = "submit">Submit</Button>
    </form>
  </div>
  )
}

