import customDecksData from '@app/data/customdecks.data';
import userdeckstatesData from '@app/data/userdeckstates.data';

export default {
  async fetchUserDeckStates() {
    const deckState = await userdeckstatesData.getUserDeckStates();
    return deckState?._id ? deckState : {};
  },

  async fetchDecks() {
    const decks = await customDecksData.getCustomDecks();
    return decks?.length ? decks : [];
  },

  async fetchMaxCustomDecksLimit() {
    const { maxCustomDecksLimit } = await customDecksData.getMaxCustomDecksLimit();
    return maxCustomDecksLimit;
  }
};