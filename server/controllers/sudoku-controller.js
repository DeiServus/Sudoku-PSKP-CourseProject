const Sudoku = require("../Sudoku");
const { Util } = require("../Util");

let board = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0],
  ];

class SudokuController{

    async puzzle(req, res, next){
        try{
            let sudoku = new Sudoku(req);
            let puzzle = sudoku.puzzle;
            res.status(200).send({ game: puzzle });
        } catch(e) {
            next(e);
        }
    }

    async validate(req, res, next){
        try{
            let puzzle = [];
            Util.copyGrid(req.body.board, puzzle);
            let sudoku = new Sudoku(req, puzzle);
            let status = sudoku.validate(req, res, next);
            res.status(200).send({ status: status });
        } catch(e) {
            next(e);
        }
    }

    async solve(req, res, next){
        try{
            let puzzle = [];
            Util.copyGrid(req.body.board, puzzle);
            let sudoku = new Sudoku(req, puzzle);
            let solution = sudoku.isSolvable();
            let solvedSudoku;
            let status;
            if (solution) {
                solvedSudoku = sudoku.solvedPuzzle;
                status = true;
            } else {
                solvedSudoku = req.body.board;
                status = false;
            }
            res.status(200).send({ solution: solvedSudoku, status: status });
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new SudokuController();