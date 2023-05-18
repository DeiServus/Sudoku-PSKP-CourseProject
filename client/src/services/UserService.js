import $api from "../http";

export default class UserService {

    static fetchUsers() {
        return $api.get('/users');
    }

    static updateAllRating(){
        return $api.get('/newrate');
    }

    static deleteUser(id){
        return $api.post('/deleteuser', {id});
    }

    static async addUser(email, password, login) {
        return $api.post('/adduser', {email, password, login});
    }
}