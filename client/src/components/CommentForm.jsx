import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '..';
import Star from './Star';
import CommentService from '../services/CommentService';
import useSortableData from './ListFunc';
import "../css/AdminPage.css";

const CommentForm = () => {
  const { store } = useContext(Context);
  const [text, setText] = useState('');
  const [mark, setMark] = useState(0);
  const [comment, setComment] = useState({});
  const [comments, setComments] = useState([]);
  const [mark1, setMark1] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const response = await CommentService.getComments();
      if(!response.data)
      setComments([])
      else
      setComments(response.data);
      const response1 = await CommentService.getAverageMark();
      if(!response1.data)
      setMark1(0)
      else
      setMark1(response1.data);
    };
    getData();
  }, [comment, mark1]);

  const { items, requestSort, sortConfig } = useSortableData(comments);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div>
      <div>
        <p className='text-returning comment-form-title'
        style={{marginTop:'20px'}}>
          Наш рейтинг: {mark1.toFixed(1)}
        </p>
        <div className='comment-form-title'>
          <span>
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                filled={value <= mark}
                onClick={() => setMark(value)}
              />
            ))}
          </span>
        </div>
        <div style={{ display: 'flex ', marginBottom: '10px' }}>
          <input
            className='comment-input'
            onChange={(e) => setText(e.target.value)}
            value={text}
            ref={ref}
            type='text'
            placeholder='Написать отзыв...'
            maxLength={100}
          />
          <button
            className='send-button'
            style={{marginLeft:'20px'}}
            onClick={() => {
              ref.current.value = '';
              setComment(store.addComment(store.user.id, mark, text));
            }}
          >
            <svg
              className='feather-send'
              xmlns='http://www.w3.org/2000/svg'
              width='23'
              height='23'
              fill='none'
              stroke='#076aff'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <line x1='22' y1='2' x2='11' y2='13'></line>
              <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
            </svg>
          </button>
        </div>
        <div>
          <table>
            <caption className='table-title'>Отзывы пользователей</caption>
            <thead>
              <tr>
                <th
                  style={{ width: '110px' }}
                  onClick={() => requestSort('id')}
                  className={getClassNamesFor('id')}
                >
                  ID
                </th>
                <th
                  onClick={() => requestSort('text')}
                  className={getClassNamesFor('text')}
                >
                  Текст
                </th>
                <th
                  style={{ width: '110px' }}
                  onClick={() => requestSort('mark')}
                  className={getClassNamesFor('mark')}
                >
                  Оценка
                </th>
                <th
                  onClick={() => requestSort('login')}
                  className={getClassNamesFor('login')}
                >
                  Никнейм
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.text}</td>
                  <td>{user.mark}</td>
                  <td>{user.user_profile.login}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default observer(CommentForm);
