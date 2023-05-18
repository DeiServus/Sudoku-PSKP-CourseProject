module.exports = class CommentDto{
    text;
    mark;
    user_id;

    constructor(model){
        this.text = model.text;
        this.mark = model.mark;
        this.user_id = model.user_id;
    }
}