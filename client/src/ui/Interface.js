import React, { useContext, useRef, useState } from 'react';
import { Context } from '..';

function Interface({ handleInterface, status }) {
  const { store } = useContext(Context);

  const [level, setLevel] = useState(0.9);
  const [seconds, setSeconds] = useState(0);
  const [isDisabled, setDisabled] = useState(true);

  const handleSubmit = () => {
    setDisabled(true);
  };

  const unhandleSubmit = () => {
    setDisabled(false);
  };

  const timerId = useRef();

  const startTimer = () => {
    timerId.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  const resetTimer = () => {
    stopTimer();
    if (seconds) {
      setSeconds((prev) => (prev = 0));
    }
  };

  return (
    <div className='interface'>
      <div className='levels-timer-wrapper'>
        <div className='levels'>
          <input
            className='levels-button'
            type='radio'
            name='level'
            title='Максимальное количество открытых клеточек. Судоку решается легко и быстро.'
            value='0.9'
            onChange={(e) => setLevel(e.target.value)}
            defaultChecked
          ></input>
          Легко
          <input
            className='levels-button levels-button-order'
            type='radio'
            name='level'
            title='Нормальный уровень сложности. Подойдет для небольшой разминки.'
            value='0.6'
            onChange={(e) => setLevel(e.target.value)}
          ></input>
          Нормально
          <input
            className='levels-button levels-button-order'
            type='radio'
            name='level'
            title='Придется хорошенько подумать. Быстро решить не получится.'
            value='0.3'
            onChange={(e) => setLevel(e.target.value)}
          ></input>
          Сложно
        </div>
        <div className='time-label'>Время: </div>
        <div className='timer'>
          <span>{seconds + ' c'}</span>
        </div>
      </div>
      <div className='action-interface'>
        <button
          className='sudoku-action-button generator-btn btn'
          onClick={() => {
            unhandleSubmit();
            handleInterface('create', level);
            resetTimer();
            startTimer();
          }}
        >
          Старт
        </button>
        <button
          className='sudoku-action-button validate-btn btn'
          onClick={() => {
            handleSubmit();
            handleInterface('validate', level, store.user.id, seconds);
            stopTimer();
          }}
          disabled={isDisabled}
        >
          Проверить
        </button>
        <button
          className='sudoku-action-button clear-btn btn'
          onClick={() => {
            handleInterface('clear');
            handleSubmit();
            resetTimer();
            stopTimer();
          }}
        >
          Очистить
        </button>
      </div>
      <div className='info-interface'>
        <input readOnly value={status}></input>
      </div>
    </div>
  );
}

export default Interface;
