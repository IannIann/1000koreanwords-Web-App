import decksData from '@app/data/decks.data';
import userdeckstatesData from '@app/data/userdeckstates.data';
import AuthService from '@app/service/auth.service'

export default {

    async fetchUserDeckStates() {
        const deckStates = await userdeckstatesData.getUserDeckStates();
        return deckStates._id ? deckStates : {};
    },

    async fetchDecks(){
        const deckList = await decksData.getAllDecks();
        return deckList.length ? deckList : [];
    }
}