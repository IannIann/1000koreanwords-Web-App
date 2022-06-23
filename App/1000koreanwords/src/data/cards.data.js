import apiAccess from "./httpService";

export default {
    getAllCards() {
        return apiAccess.GetJson('cards')
    },
}