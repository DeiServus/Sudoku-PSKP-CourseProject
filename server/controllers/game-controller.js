const ApiError = require("../exceptions/api-error");
const gameService = require("../service/game-service");
const {validationResult} = require('express-validator');

class GameController{
    async getGames(req, res, next){
        try{
            const {id} = req.body;
            const users = await gameService.findGameByID(id);
            return res.json(users)
        }catch(e){
            next(e);
        }
    }

    async addGame(req, res, result, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {uid, lid, time} = req.body;
            const commentData = await gameService.addGame(uid, lid, time, result);
        } catch (error) {
            next(error);
        }
    }

    async deleteGame(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {id} = req.body;
            const gameData = await gameService.deleteGame(id);
            return res.json(gameData);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new GameController();