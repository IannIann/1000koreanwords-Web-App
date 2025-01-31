import AuthService from '@app/service/auth.service'
import customdecksData from '@app/data/customdecks.data';
import customcardsData from '@app/data/customcards.data';
import userdeckstatesData from '@app/data/userdeckstates.data'

export default {
    async fetchDeck(deckId) {
        const userId = AuthService.getCurrentUser().id;
        const res = await customdecksData.getCustomDeck(deckId, userId)

        return res.deck[0];
    },

    async updateDeck(deck) {
        deck = this.formatDeckForUpdate(deck);
        await customdecksData.updateCustomDeck(deck);
    },

    async updateCard(card) {
        await customcardsData.updateCustomCard(card);
    },

    async createCustomCard() {
        const card = {
            question: "",
            answer: ""
        }
        const userId = AuthService.getCurrentUser().id;
        const res = await customcardsData.createCustomCard(userId, card);
        return res;
    },

    async pushToDeck(deckId, cardId) {
        const userId = AuthService.getCurrentUser().id;
        await customdecksData.pushCardToDeck(userId, deckId, cardId);
    },

    async deleteCard(deckId, cardId) {
        const userId = AuthService.getCurrentUser().id;
    
        await customdecksData.deleteCardFromDeck(userId, deckId, cardId);
        await userdeckstatesData.deleteCardFromDeckState(userId, deckId, cardId);
        await customcardsData.deleteCustomCard(userId, cardId);
    },

    formatDeckForUpdate(deck) {
        const cardsId = deck.cards.map(card => card._id);
        const deckWithCardsId = {...deck, cards: cardsId};
    
        return deckWithCardsId;
    }
}
    