const nodemailer = require('nodemailer')

class MailService{

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth:{
                user:'kokokokukareku07@gmail.com',
                pass:'nmkukybwgnmicrso'
            }
        })
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from:'kokokokukareku07@gmail.com',
            to:to,
            subject: 'Активация профиля на Sudoku.com',
            text:'',
            html:`
                    <div>
                        <h1>Для активации перейдите по ссылке:</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }

    async sendMessageMail(to, message, login){
        await this.transporter.sendMail({
            from:'kokokokukareku07@gmail.com',
            to:to,
            subject: 'Сообщение от администрации Sudoku.com',
            text:'',
            html:`
                    <div>
                        <h1>Дорогой ${login}</h1>
                        <h2>${message}</h2>
                    </div>
                `
        })
    }
}

module.exports = new MailService();