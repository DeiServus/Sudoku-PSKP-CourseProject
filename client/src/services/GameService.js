import $api from "../http";

export default class GameService {

    static fetchGames(id) {
        return $api.post('/games', {id});
    }
}