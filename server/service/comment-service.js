const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const CommentDto = require('../dtos/comment-dto');

class CommentService{
    
    async addComment(text, uid, mark){
        var comment = await prisma.comment.findFirst({ where: { user_id: uid } });
        if(comment)
        {
            comment = await prisma.comment.update({
                where:{id:comment.id},
                data:{
                    text:text,
                    mark: mark
                }
            })
        }else{
            comment = await prisma.comment.create({
                data:{
                    user_id:uid,
                    text:text,
                    mark: mark,
                }
            })
        }
        const commentDto = new CommentDto(comment);

        return {comment:commentDto}
    }

    async getAllComments() {
        const users = await prisma.comment.findMany({
            include:{
                user_profile:true
            }
        });
        users.forEach(e=>{
            console.log(e.user_profile.login)
        })
        return users;
    }

    async getComment(id){
        const user = await prisma.comment.findFirst({where:{user_id:id}});
        return user;
    }

    async getAverageMark(){
        const mark = await prisma.comment.aggregate({_avg:{mark:true}})
        return mark._avg.mark;
    }    

    async deleteComment(id){
        const comcheck = await prisma.comment.findFirst({ where: { id: id } });
        if (!comcheck) {
            throw ApiError.BadRequest('У вас нет отзыва');
        }
        const comment = await prisma.comment.delete({
            where:{
                id:id
            }
        });

        const commentDto = new CommentDto(comment);

        return {comment:commentDto}
    }
}

module.exports = new CommentService();