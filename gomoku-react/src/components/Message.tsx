import React from 'react';
import style from './Message.module.css';

type MessageProps = {
  variant: 'info' | 'error';
  message: string | boolean;
}

export default function Message(props: MessageProps) {
  const {variant, message} = props;
  return (
    <div className = {`${style.message} ${style[variant]}`}>{message}</div>
  )
}
