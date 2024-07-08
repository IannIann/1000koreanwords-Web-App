import apiAccess from "./httpService";

export default {
    createCustomCard(userId, card) {
        return apiAccess.PostJson('customcards/create', {userId, card});
    },
}