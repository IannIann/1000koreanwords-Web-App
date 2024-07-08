import customDecksData from '@app/data/customdecks.data';
import userdeckstatesData from '@app/data/userdeckstates.data';
import AuthService from '@app/service/auth.service';

export default {
  async fetchDecks(){
    const userId = AuthService.getCurrentUser().id;
    const decks = await customDecksData.getCustomDecks(userId);
    
    return decks.length ? decks : [];
  },

  async fetchUserDeckStates(){
    const userId = AuthService.getCurrentUser().id;
    const deckState = await userdeckstatesData.getUserDeckStatesById(userId);

    return deckState._id ? deckState : {};
  },
};
