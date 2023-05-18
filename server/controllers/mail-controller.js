const mailService = require("../service/mail-service");
const userService = require("../service/user-service");


class MailController{
    async sendMessageMail(req, res, next) {
        try {
            const {id, message} =  req.body;
            const user = await userService.getUser(id);
            mailService.sendMessageMail(user.email, message, user.login);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MailController();