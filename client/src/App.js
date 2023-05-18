import "./css/App.css";
import LoginForm from "./components/LoginForm";
import { observer } from "mobx-react-lite";
import {Navigate, Route, Routes} from "react-router-dom";
import UserPageForm from "./components/UserPageForm";
import RatingListForm from "./components/RatingListForm";
import GameListForm from "./components/GameListForm";
import CommentForm from "./components/CommentForm";
import Sudoku from "./Sudoku";
import { useContext, useEffect } from "react";
import { Context } from ".";
import AdminPageForm from "./components/AdminPageForm";
import SendMessageForm from "./components/SendMessageForm";
import NotFoundForm from "./components/NotFoundForm";

function App() {
  const {store} = useContext(Context);

  useEffect(()=>{
      if(localStorage.getItem('token')){
        store.checkAuth();
      }
      if(localStorage.getItem('isadmin')){
        store.checkAdmin();
      }
      if(localStorage.getItem('role')==2){
        store.setAdmin(true);
      }
  }, [store])



  if(store.isLoading){
    return <div>Загрузка...</div>
  } 

  if(store.isAuth && store.isAdmin==false){
    return (
      <div className="App">
        <Routes>
          <Route path="/notactivated" element={<NotFoundForm/>}></Route>
          <Route path="/login" element={<Navigate to={"/game"}/>}></Route>
          <Route path="/game" element={<UserPageForm/>}>
            <Route path="/game/rating" element={<RatingListForm />}></Route>
            <Route path="/game/games" element={<GameListForm/>}></Route>
            <Route path="/game/comments" element={<CommentForm/>}></Route>
            <Route index element={<Sudoku />}></Route>
          </Route>
        </Routes>
      </div>
    );
  }

  if(store.isAuth && store.isAdmin==true){
    return(
      <div className="App">
        <Routes>
          <Route path="*" element={<Navigate to={"/admin"}/>}></Route>
          <Route path="/admin" element={<AdminPageForm/>}></Route>
          <Route path="/admin/:id" element={<SendMessageForm/>}></Route>
          <Route path="/game" element={<Navigate to={"/admin"}/>}></Route>
        </Routes></div>
    )
  }

  return(
    <Routes>
      <Route path="/login" element={<LoginForm/>}></Route>
      <Route path="*" element={<Navigate to={"/login"}/>}></Route>
    </Routes>
  )
}


export default observer(App);