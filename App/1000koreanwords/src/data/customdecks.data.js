import apiAccess from '@app/data/httpService';

export default {
    getCustomDecks(userId){
        return apiAccess.GetJson(`customdecks/user/${userId}`)
    },
    getCustomDeck(deckId, userId){
        return apiAccess.GetJson(`customdecks/user/${userId}/deck/${deckId}`)
    },
    getMaxCustomDecksLimit(){
        return apiAccess.GetJson('customdecks/limit')
    },
    createCustomDeck(userId, theme) {
        return apiAccess.PostJson('customdecks/create', { userId, theme});
    },
    deleteCustomDeck(userId, id) {
        return apiAccess.DeleteJson('customdecks/delete', {userId, id});
    },
    pushCardToDeck(userId, deckId, cardId) {
        return apiAccess.PostJson('customdecks/pushCardToDeck', {userId, deckId, cardId});
    },
    updateCustomDeck(deck){ 
        return apiAccess.PostJson('customdecks/updateCustomDeck', deck)
    },
    deleteCardFromDeck(userId, deckId, cardId) {
        return apiAccess.DeleteJson('customdecks/deleteCardFromDeck', {userId, deckId, cardId});
    }
}