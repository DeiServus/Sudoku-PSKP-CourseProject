module.exports = class GameDto{
    result;
    level_id;
    user_id;
    time;

    constructor(model){
        this.result = model.result;
        this.level_id = model.level_id;
        this.startDate = model.startDate;
        this.time = model.time;
    }
}