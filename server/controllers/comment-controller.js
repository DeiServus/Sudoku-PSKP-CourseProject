const ApiError = require("../exceptions/api-error");
const commentService = require("../service/comment-service");
const {validationResult} = require('express-validator');

class CommentController{
    async addComment(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {id, mark, text} = req.body;
            const commentData = await commentService.addComment(text, id, mark);
            return res.json(commentData);
        } catch (error) {
            next(error);
        }
    }

    async deleteComment(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {id} = req.body;
            const commentData = await commentService.deleteComment(id);
            return res.json(commentData);
        } catch (error) {
            next(error);
        }
    }

    async getComments(req, res, next){
        try{
            const comments = await commentService.getAllComments();
            return res.json(comments)
        }catch(e){
            next(e);
        }
    }

    async getComment(req, res, next){
        try {
            const {id} = req.body;
            const commentData = await commentService.getComment(id);
            return res.json(commentData);
        } catch (error) {
            next(error);
        }
    }

    async getAverageMark(req, res, next){
        try {
            const mark = await commentService.getAverageMark();
            return res.json(mark);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CommentController();