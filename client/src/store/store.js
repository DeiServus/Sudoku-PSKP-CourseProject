import {makeAutoObservable} from 'mobx';
import AuthService from '../services/AuthService';
import CommentService from '../services/CommentService';
import axios from 'axios';
import { API_URL } from '../http';
import UserService from '../services/UserService';

export default class Store{
    user = {};
    isAuth = false;
    isReg = false;
    isGame = false;
    isLoading = false;
    isAdmin = false;
    isActivated = false;
    constructor(){
        makeAutoObservable(this);
    }

    setActivated(bool){
        this.isActivated = bool;
    }

    setAdmin(bool){
        this.isAdmin = bool;
    }

    setLoading(bool){
        this.isLoading = bool;
    }

    setGame(bool){
        this.isGame = bool;
    }

    setAuth(bool){
        this.isAuth = bool;
    }

    setUser(user){
        this.user = user;
    }

    setReg(isReg){
        this.isReg = isReg;
    }

    async clickGame(){
        try{
            this.setGame(true);
        } catch(e) {
            console.log(e.response?.data?.message)
        }
    }

    async clickReg(){
        try{
            this.setReg(true);
        } catch(e) {
            console.log(e.response?.data?.message)
        }
    }

    async clickLog(){
        try{
            this.setReg(false);
        } catch(e) {
            console.log(e.response?.data?.message)
        }
    }

    async login(email, password){
        this.setLoading(true);
        try{
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            this.setActivated(response.data.user.isActivated);
            localStorage.setItem('role', response.data.user.role_id);
            localStorage.setItem('active', response.data.user.isActivated);
            localStorage.setItem('name', response.data.user.login);
            if(localStorage.getItem('role')==1)
                this.setAdmin(false)
            else
                this.setAdmin(true);
        } catch(e) {
            window.history.pushState({},null,'/login')
            alert(e.response?.data?.message)
        }finally{
            this.setLoading(false);
        }
    }

    async registration(email, password, name){
        //this.setLoading(true);
        try{
            const response = await AuthService.registration(email, password, name);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('active', response.data.user.isActivated);
            localStorage.setItem('role', response.data.user.role_id);
            localStorage.setItem('name', response.data.user.login);
            this.setActivated(false);
            this.setAdmin(false)
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e) {
            alert(e.response?.data?.message)
        }finally{
            //this.setLoading(false);
        }
    }

    async addUser(email, password, name){
        try{
            await UserService.addUser(email, password, name);
        } catch(e) {
            alert(e.response?.data?.message)
        }
    }

    async logout(){
        this.setLoading(true);
        try{
            await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('active');
            localStorage.removeItem('name');
            localStorage.removeItem('role');
            this.setAdmin(false);
            this.setAuth(false);
            this.setUser({});
        } catch(e) {
            console.log(e.response?.data?.message)
        }finally{
            this.setLoading(false);
        }
    }

    async checkAuth(){
        this.setLoading(true);
        try{
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials:true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false);
        }
    }

    async checkAdmin(){
        this.setLoading(true);
        try{
            localStorage.setItem('isadmin', true);
            this.setAdmin(true)
        } catch(e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false);
        }
    }

    async addComment(id, mark, text){
        try {
            await CommentService.addcomment(id, mark, text)
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }
}