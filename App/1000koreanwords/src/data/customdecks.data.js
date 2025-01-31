import apiAccess from '@app/data/httpService';

export default {
    getCustomDecks(userId){
        return apiAccess.GetJson(`customdecks_new/${userId}`)
    },
    getCustomDeck(deckId, userId){
        return apiAccess.GetJson(`customdecks_new/${userId}/${deckId}`)
    },
    createCustomDeck(userId, theme) {
        return apiAccess.PostJson('customdecks_new/create', { userId, theme});
    },
    deleteCustomDeck(userId, id) {
        return apiAccess.DeleteJson('customdecks_new/delete', {userId, id});
    },
    pushCardToDeck(userId, deckId, cardId) {
        return apiAccess.PostJson('customdecks_new/pushCardToDeck', {userId, deckId, cardId});
    },
    updateCustomDeck(deck){ 
        return apiAccess.PostJson('customdecks_new/updateCustomDeck', deck)
    },
    deleteCardFromDeck(userId, deckId, cardId) {
        return apiAccess.DeleteJson('customdecks_new/deleteCardFromDeck', {userId, deckId, cardId});
    }
}