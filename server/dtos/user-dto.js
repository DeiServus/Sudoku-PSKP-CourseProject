module.exports = class UserDto{
    email;
    id;
    iSActivated;
    rating;

    constructor(model){
        this.email = model.email;
        this.iSActivated = model.isActivated;
        this.id = model.id;
        this.rating = model.rating;
    }
}