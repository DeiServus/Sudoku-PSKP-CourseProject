import { observer } from 'mobx-react-lite';
import useSortableData from './ListFunc';
import { useState } from 'react';
import UserService from '../services/UserService';
import "../css/AdminPage.css"

const RatingListForm = (props) => {
  const [users, setUsers] = useState([]);

  useState(() => {
    const getUsers = async () => {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    };
    getUsers();
  }, []);

  const { items, requestSort, sortConfig } = useSortableData(users);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div style={{marginTop:"25px"}} className='table-wrapper'>
      <table>
        <caption className='table-title'>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            Наши игроки{' '}
          </div>
        </caption>
        <thead>
          <tr>
            <th
              onClick={() => requestSort('login')}
              className={getClassNamesFor('login')}
            >
              Имя
            </th>
            <th
              onClick={() => requestSort('email')}
              className={getClassNamesFor('eamil')}
            >
              Email
            </th>
            <th
              style={{ width: '110px' }}
              onClick={() => requestSort('rating')}
              className={getClassNamesFor('rating')}
            >
              Рейтинг
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((user) => (
            <tr key={user.id}>
              <td>{user.login}</td>
              <td>{user.email}</td>
              <td>{user.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default observer(RatingListForm);
