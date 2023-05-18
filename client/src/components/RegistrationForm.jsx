import React, { useContext, useState } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import LoginForm from './LoginForm';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { store } = useContext(Context);

  if (!store.isReg) {
    return <LoginForm />;
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <span className='title'>Sudoku</span>
        <input
          className='text elem'
          onChange={(e) => setName(e.target.value)}
          value={name}
          type='text'
          placeholder='Имя'
        />
        <input
          className='text elem'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='text'
          placeholder='Email'
        />
        <input
          className='text elem'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          placeholder='Пароль'
        />
        <button
          className='elem login-button base-button'
          onClick={() => {
            store.registration(email, password, name);
          }}
        >
          Зарегистрироваться
        </button>
        <span>
          Уже есть аккаунт?
          <span> </span>
          <span
            className='register-button'
            onClick={() => {
              store.clickLog();
            }}
          >
            Войдите!
          </span>
        </span>
      </div>
    </div>
  );
};

export default observer(RegistrationForm);
