import {useState} from "react";
import { observer } from "mobx-react-lite";
import { Link, useLocation, useParams } from "react-router-dom";
import MailService from "../services/MailService";
import '../css/Chat.css'

const SendMessageForm = () => {
    const {id} = useParams();
    const [text, setText] = useState('');
    const {state} = useLocation();

    return(
    <div style={{height:'650px',display:'flex', margin:'auto', flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
        <h2 style={{marginBottom:'25px'}}>Получатель: {state.email}</h2>
        <div style={{display:'flex'}}>
        <input 
        className="chat-input"
        style={{width:"400px",marginRight:"10px"}}
                onChange={e => setText(e.target.value)}
                value={text}
                type="text" 
                placeholder="Написать на почту"
        />
        <Link to={'/admin'}>
        <button
          className='send-button'
          onClick={() => {MailService.sendMail(id, text); alert('Отправлено');}}
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
        </Link>
        </div>
    </div>
    );
}

export default observer(SendMessageForm);