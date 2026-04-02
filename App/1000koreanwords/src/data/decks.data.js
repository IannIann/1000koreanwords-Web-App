import apiAccess from '@app/data/httpService';

export default {
    getAllDecks() {
        return apiAccess.GetJson('/decks');
    },
    getDeck(id) {
        return apiAccess.GetJson(`/decks/${id}`);
    },
};