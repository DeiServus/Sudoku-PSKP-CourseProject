const ApiError = require("../exceptions/api-error");
const userService = require("../service/user-service");
const {validationResult} = require('express-validator');


class UserController{
    async registration(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации:\nдлина пароля от 3 до 32, верный ввод почты и т.д.', errors.array()))
            }
            const {email, password, login} = req.body;
            const userData = await userService.registration(email, password, login);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async addUser(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации:\nдлина пароля от 3 до 32, верный ввод почты и т.д.', errors.array()))
            }
            const {email, password, login} = req.body;
            const userData = await userService.addUser(email, password, login);
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async login(req, res, next){
        try{
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        }catch(e){
            next(e);
        }
    }

    async activate(req, res, next){
        try{
            console.log('controller');
            const activateLink = req.params.link;
            await userService.activate(activateLink);
            return res.redirect(process.env.CLIENT_URL);
        }catch(e){
            next(e);
        }
    }

    async refresh(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async getUsers(req, res, next){
        try{
            const users = await userService.getAllUsers();
            return res.json(users)
        }catch(e){
            next(e);
        }
    }

    async deleteUser(req, res, next){
        try{
            const {id} = req.body;
            const users = await userService.deleteUser(id);
            return res.json(users)
        }catch(e){
            next(e);
        }
    }

    async updateRating(req, res, next){
        try{
            var raiting = 0;
            const {uid, time, lid} = req.body;

            if(time<=30) raiting = raiting + 75;
            else if(time<60) raiting = raiting + 50;
            else if(time<90) raiting = raiting + 25;

            if(lid==1) raiting = raiting + 50;
            else if(lid<2) raiting = raiting + 100;
            else if(lid<3) raiting = raiting + 300;

            const user = await userService.getUser(uid);
            raiting = raiting + user.rating;
            const users = await userService.updateRating(uid, raiting);
        }catch(e){
            next(e);
        }
    }

    async updateAllRating(req, res, next){
        try {
            const users = userService.updateAllRating();
            return res.json(users);
        } catch (error) {
            next(e);
        }
    }
}

module.exports = new UserController();