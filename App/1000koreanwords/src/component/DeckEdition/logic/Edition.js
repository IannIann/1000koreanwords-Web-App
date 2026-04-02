import customdecksData from '@app/data/customdecks.data';
import customcardsData from '@app/data/customcards.data';
import userdeckstatesData from '@app/data/userdeckstates.data';

export default {
    async fetchDeck(deckId) {
        const res = await customdecksData.getCustomDeck(deckId);
        return res.deck;
    },

    async getDeckCardsLimit() {
        const res = await customdecksData.getMaxCardsLimit();
        return res.customDeckCardLimit;
    },

    async updateDeck(deck) {
        await customdecksData.updateCustomDeck(this.formatDeckForUpdate(deck));
    },

    async updateCard(card) {
        await customcardsData.updateCustomCard(card);
    },

    async createCustomCard(deckId) {
        const card = { question: '', answer: '' };
        return await customcardsData.createCustomCard(card, deckId);
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
        return { ...deck, cards: deck.cards.map((card) => card._id) };
    },
};