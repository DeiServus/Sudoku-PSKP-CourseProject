import { useEffect, useState } from "react"
import io from "socket.io-client"
import "../css/App.css";
import '../css/Chat.css'

const socket = io.connect("http://localhost:5001")
const ChatForm = (props) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        socket.emit("sendmessage", {
            message: message,
            name: props.email
        })
    }

    useEffect(()=>{
        socket.on("sendmessage", data =>{
            setMessages([...messages, data]);
        })
    }, [messages])

    return (
        <div style={{ marginTop: '22px'}}>
      <div className='chat-title'>Чат</div>
      <div
        className='chat-form'
        style={{
          height: '450px',  overflowY:"auto" 
        }}
      >
        {messages.map((message) => {
          return (
            <div>
              <h4>{message.name}:</h4>
              <p style={{ overflowWrap: 'break-word', width: '100%' }}>
                {message.message}
              </p>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex ' }}>
        <input
          className='chat-input'
          placeholder='Написать сообщение...'
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          maxLength={80}
          value={message}
        ></input>
        <button
          className='send-button'
          onClick={() => {
            sendMessage();
            setMessage('');
          }}
          disabled={message === '' ? true : false}
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
    </div>
    )
}

export default ChatForm;