import AuthService from '@app/service/auth.service'
import customdecksData from '@app/data/customdecks.data';
import customcardsData from '@app/data/customcards.data';
import userdeckstatesData from '@app/data/userdeckstates.data'

export default {
    async fetchDeck(deckId) {
        const res = await customdecksData.getCustomDeck(deckId)

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
        const res = await customcardsData.createCustomCard(card);
        return res;
    },

    async pushToDeck(deckId, cardId) {
        await customdecksData.pushCardToDeck(deckId, cardId);
    },

    async deleteCard(deckId, cardId) {
        await customdecksData.deleteCardFromDeck(deckId, cardId);
        await userdeckstatesData.deleteCardFromDeckState(deckId, cardId);
        await customcardsData.deleteCustomCard(cardId);
    },

    formatDeckForUpdate(deck) {
        const cardsId = deck.cards.map(card => card._id);
        const deckWithCardsId = {...deck, cards: cardsId};
    
        return deckWithCardsId;
    }
}
    