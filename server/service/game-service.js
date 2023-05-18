const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const GameDto = require('../dtos/game-dto');

class GameService{

    async findGameByID(id){
        const games = await prisma.game.findMany({
            where:{user_id:id}
        });
        return games;
    }

    async addGame(uid, lid, t, result){
        const game = await prisma.game.create({
            data:{
                user_id:uid,
                level_id:lid,
                time: t,
                result: result
            }
        })

        const gameDto = new GameDto(game);

        return {game:gameDto}
    }

    async deleteGame(id){
        const game = await prisma.game.delete({
            where:{
                id: id
            }
        })

        const gameDto = new GameDto(game);

        return {game:gameDto}
    }
}

module.exports = new GameService();