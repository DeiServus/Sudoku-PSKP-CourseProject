import React, { useContext, useState } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import RegistrationForm from './RegistrationForm';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { store } = useContext(Context);

  if (store.isReg) {
    return <RegistrationForm />;
  }
  return (
    <div className='wrapper'>
      <div className='container'>
        <span className='title'>Sudoku</span>
        <input
          className='text elem'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='text'
          placeholder='Email'/>
        <input
          className='text elem'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          placeholder='Пароль'/>
        <Link to={'/game'}>
          <button
            className='elem login-button base-button'
            onClick={() => {
              store.login(email, password);
              /*if (email === 'admin@gmail.com' && password === 'admin') {
                localStorage.setItem('isadmin', true);
                store.setAdmin(true);
              }*/
            }}>Войти
          </button>
        </Link>
        <span>
          Нет аккаунта?
          <span> </span>
          <span
            className='register-button'
            onClick={() => {
              store.clickReg();
            }}
          >
            Создайте его!
          </span>
        </span>
      </div>
    </div>
  );
};

export default observer(LoginForm);