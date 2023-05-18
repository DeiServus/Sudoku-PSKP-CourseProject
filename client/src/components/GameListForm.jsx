import { observer } from 'mobx-react-lite';
import useSortableData from './ListFunc';
import { useContext, useEffect, useState } from 'react';
import GameService from '../services/GameService';
import { Context } from '..';
import "../css/AdminPage.css"

const GameListForm = () => {
  const { store } = useContext(Context);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const response = await GameService.fetchGames(store.user.id);
      setGames(response.data);
    };
    getGames();
  }, [store.user.id]);

  const { items, requestSort, sortConfig } = useSortableData(games);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div style={{marginTop:"25px"}} className='table-wrapper'>
      <table>
        <caption className='table-title'>Ваши игры</caption>
        <thead>
          <tr>
            <th
              style={{ width: '70px' }}
              onClick={() => requestSort('id')}
              className={getClassNamesFor('id')}
            >
              ID
            </th>
            <th
              style={{ width: '120px' }}
              onClick={() => requestSort('result')}
              className={getClassNamesFor('result')}
            >
              Результат
            </th>
            <th
              style={{ width: '120px' }}
              onClick={() => requestSort('level_id')}
              className={getClassNamesFor('level_id')}
            >
              Уровень
            </th>
            <th
              style={{ width: '120px' }}
              onClick={() => requestSort('time')}
              className={getClassNamesFor('time')}
            >
              Время (с)
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.result === true ? 'победа' : 'проигрыш'}</td>
              <td>
                {user.level_id === 1
                  ? 'легкий'
                  : user.level_id === 2
                  ? 'нормальный'
                  : 'сложный'}
              </td>
              <td>{user.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default observer(GameListForm);
