import apiAccess from "./httpService";

export default {
    getCustomDecks(userId){
        return apiAccess.GetJson(`customdecks/${userId}`)
    },
    getCustomDeck(deckId, userId){
        return apiAccess.GetJson(`customdecks/${userId}/${deckId}`)
    },
    createCustomDeck(userId, name, lang) {
        return apiAccess.PostJson('customdecks/create', { userId, name, lang });
    },
    deleteCustomDeck(userId, id) {
        return apiAccess.DeleteJson('customdecks/delete', {userId, id});
    },
    pushCardToDeck(userId, deckId, cardId) {
        return apiAccess.PostJson('customdecks/pushCardToDeck', {userId, deckId, cardId});
    }
}