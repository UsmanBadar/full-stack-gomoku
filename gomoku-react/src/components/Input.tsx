import React from 'react';
import style from './Input.module.css';

//Ui input component
export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
        className = {style.input}
        type="text"
        autoComplete = "false"
        {...props}
    />
  )
}
