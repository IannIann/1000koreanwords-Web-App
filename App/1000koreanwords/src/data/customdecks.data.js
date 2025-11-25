import apiAccess from '@app/data/httpService';

export default {
    getCustomDecks(){
        return apiAccess.GetJson(`/customdecks`)
    },
    getCustomDeck(deckId){
        return apiAccess.GetJson(`/customdecks/deck/${deckId}`)
    },
    getMaxCustomDecksLimit(){
        return apiAccess.GetJson('/customdecks/limit')
    },
    getMaxCardsLimit(){
        return apiAccess.GetJson('/customdecks/cardsLimit')
    },
    createCustomDeck(theme) {
        return apiAccess.PostJson('/customdecks/create', {theme});
    },
    deleteCustomDeck(id) {
        return apiAccess.DeleteJson('/customdecks/delete', {id});
    },
    pushCardToDeck(deckId, cardId) {
        return apiAccess.PostJson('/customdecks/pushCardToDeck', {deckId, cardId});
    },
    updateCustomDeck(deck){ 
        return apiAccess.PostJson('/customdecks/updateCustomDeck', deck)
    },
    deleteCardFromDeck(deckId, cardId) {
        return apiAccess.DeleteJson('/customdecks/deleteCardFromDeck', {deckId, cardId});
    }
}