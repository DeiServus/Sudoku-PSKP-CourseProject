import '../css/UserPage.css';
import "../css/App.css";
import  { useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import {Link, Navigate, Outlet} from "react-router-dom";
import ChatForm from "./ChatForm";

const UserPageForm = () => {
    const {store} = useContext(Context);

    if(store.isActivated===false){
      return (<Navigate to={'/notactivated'}/>)
    }
    return (
      <div className='wrapper-user-page'>
        <div className='wrapper-aligner'>
          <div className='header-wrapper'>
            <span className='text-returning'>
              {`Приветствуем вас, ${localStorage.getItem('name')}`}
            </span>
            <Link
            className='menu-last-item'
            to='/login'
            onClick={() => {
              store.logout();
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#121212'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='icon feather-log-out'
            >
              <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
              <polyline points='16 17 21 12 16 7'></polyline>
              <line x1='21' y1='12' x2='9' y2='12'></line>
            </svg>
          </Link>
          </div>
          <span className='rating-text'>
            {`Ваша почта: ${store.user.email}  |  Ваш рейтинг: ${store.user.rating}`}
          </span>
          <div className='button-wrapper'>
            <Link to='/game' className='menu-item'>
              Играть
            </Link>
            <Link to='/game/rating' className='menu-item'>
              Общий рейтинг
            </Link>
            <Link to='/game/games' className='menu-item'>
              Ваши результаты
            </Link>
            <Link to='/game/comments' className='menu-item'>
              Оставить отзыв
            </Link>
          </div>
          <div>
            <div style={{float:"left", width:"80%"}}><Outlet/></div>
            <div style={{float:"right", width:"20%"}}><ChatForm  email={store.user.email}/></div>
          </div>
        </div>
      </div>
    );
}


export default observer(UserPageForm);