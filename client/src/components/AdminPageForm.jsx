import { useContext, useEffect, useState } from "react";
import UserService from "../services/UserService";
import useSortableData from "./ListFunc";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Link } from "react-router-dom";
import "../css/AdminPage.css";

const AdminPageForm = () =>{
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { store } = useContext(Context);

    useEffect(()=>{
        async function fusers(){
            await UserService.fetchUsers();
        }
        fusers();
    }, [store.users])

    useEffect(()=>{
        console.log(store.isAuth + ' ' + store.isAdmin)
        const getUsers = async() =>{
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        }
        getUsers();
    }, []);

    async function updateUsers(){
        await UserService.updateAllRating();
        const response = await UserService.fetchUsers();
        setUsers(response.data);
    }

    async function deleteUser(id){
        await UserService.deleteUser(id);
        const response = await UserService.fetchUsers();
        setUsers(response.data);
    }

    const { items, requestSort, sortConfig } = useSortableData(users);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    
    if(store.isLoading){
        return <div>Загрузка...</div>
    } 

    return (
        <div className='wrapper-user-page'>
          <div className='wrapper-aligner'>
            <div className='header-wrapper'>
              <p className='text-returning admin-panel-title'>
                Панель администратора
              </p>
              <svg
                className='menu-last-item icon'
                xmlns='http://www.w3.org/2000/svg'
                width='28'
                height='28'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#121212'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                onClick={() => {
                  store.logout();
                  store.setAdmin(false);
                }}
              >
                <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                <polyline points='16 17 21 12 16 7'></polyline>
                <line x1='21' y1='12' x2='9' y2='12'></line>
              </svg>
            </div>
            <div className='admin-register-int'>
              <p className='admin-action-title'>Создать пользователя:</p>
              <input
                className='admin-input'
                onChange={(e) => setName(e.target.value)}
                value={name}
                type='text'
                placeholder='Имя'
              />
              <input
                className='admin-input'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='text'
                placeholder='Email'
              />
              <input
                className='admin-input'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='Пароль'
              />
              <button
                className='base-button admin-panel-button'
                onClick={async () => {
                  await store.addUser(email, password, name);
                  const response = await UserService.fetchUsers();
                  setUsers(response.data);
                  setEmail('');
                  setName('');
                  setPassword('');
                }}
              >
                Зарегистрировать
              </button>
            </div>
            <div className='table-wrapper'>
              <table>
                <caption className='table-title'>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    Наши игроки{' '}
                    <div style={{ marginLeft: '10px' }}>
                      {' '}
                      <svg
                        onClick={() => updateUsers()}
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        class='icon refresh'
                      >
                        <polyline points='23 4 23 10 17 10'></polyline>
                        <polyline points='1 20 1 14 7 14'></polyline>
                        <path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'></path>
                      </svg>
                    </div>
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
                    <th className='icon-column'></th>
                    <th className='icon-column'></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((user) => (
                    <tr key={user.id}>
                      <td>{user.login}</td>
                      <td>{user.email}</td>
                      <td>{user.rating}</td>
                      <td>
                          <Link to={`/admin/${user.id}`} state={{email:user.email}}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            class='icon'
                          >
                            <line x1='22' y1='2' x2='11' y2='13'></line>
                            <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
                          </svg>
                        </Link>
                      </td>
                      <td>
                        <svg
                          onClick={() => {
                            deleteUser(user.id);
                          }}
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          class='icon delete'
                        >
                          <polyline points='3 6 5 6 21 6'></polyline>
                          <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                          <line x1='10' y1='11' x2='10' y2='17'></line>
                          <line x1='14' y1='11' x2='14' y2='17'></line>
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
}

export default observer(AdminPageForm);