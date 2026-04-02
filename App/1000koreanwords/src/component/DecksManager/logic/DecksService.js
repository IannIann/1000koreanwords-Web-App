import decksData from '@app/data/decks.data';
import userdeckstatesData from '@app/data/userdeckstates.data';

export default {
  async fetchUserDeckStates() {
    const deckStates = await userdeckstatesData.getUserDeckStates();
    return deckStates?._id ? deckStates : {};
  },

  async fetchDecks() {
    const decks = await decksData.getAllDecks();
    return decks?.length ? decks : [];
  }
};