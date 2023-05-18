const express = require('express');
const userController = require('../controllers/user-controller');
const sudokuController = require('../controllers/sudoku-controller');

const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const { getGames } = require('../controllers/game-controller');
const  commentController = require('../controllers/comment-controller');
const mailController = require('../controllers/mail-controller');
 
router.post('/registration',
            body('email').isEmail(),
            body('password').isLength({min:3, max:32}),
            body('login').isLength({min:3, max:32}),
            userController.registration);

router.post('/adduser',
            body('email').isEmail(),
            body('password').isLength({min:3, max:32}),
            userController.addUser);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.get('/activate/:link', userController.activate);

router.get('/refresh', userController.refresh);

router.get('/users',
            authMiddleware,
            userController.getUsers);

router.post('/games', 
            authMiddleware, 
            getGames);

router.get('/comments', 
            commentController.getComments);

router.post('/comment', 
            authMiddleware, 
            commentController.getComment);

router.post('/addComment',
            body('text').isLength({min:0, max:50}), 
            commentController.addComment);
router.get('/mark', 
            commentController.getAverageMark);

router.get('/newrate', 
            authMiddleware, 
            userController.updateAllRating);

router.post('/deleteuser', 
            authMiddleware, 
            userController.deleteUser);

router.post('/sendmail', 
            authMiddleware, 
            mailController.sendMessageMail);

router.post('/puzzle',  
            sudokuController.puzzle);

router.post('/solve', 
            sudokuController.solve);

router.post('/validate', 
            sudokuController.validate);

module.exports = router