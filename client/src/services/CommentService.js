import $api from "../http";

export default class CommentService {
    static addcomment(id, mark, text) {
        try {
            return $api.post('/addComment', {id, mark, text});
        } catch (error) {
            alert(console.log(error.response?.data?.message))
        }
        
    }
    static getComments(){
        return $api.get('/comments')
    }
    static getComment(id){
        return $api.post('/comment', {id});
    }
    static getAverageMark(){
        return $api.get('/mark');
    }
}