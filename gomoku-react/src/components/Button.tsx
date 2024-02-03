import React from 'react';

import style from './Button.module.css';

//Ui button component
export default function Button(
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
    const {children, ...rest} = props;
  return (
    <button className={style.button} {...rest}>{children}</button>
  )
}
