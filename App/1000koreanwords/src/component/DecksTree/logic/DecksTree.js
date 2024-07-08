import decksData from '@app/data/decks.data';
import userdeckstatesData from '@app/data/userdeckstates.data';
import AuthService from '@app/service/auth.service'

export default {
    async fetchDecks(grade = "Beginner") {
        const deckList = await decksData.getDecksByLangAndGrade("eng", grade);
        return deckList.length ? deckList : [];
    },

    async fetchUserDeckStates() {
        const userId = AuthService.getCurrentUser().id;
        const deckStates = await userdeckstatesData.getUserDeckStatesById(userId);

        return deckStates._id ? deckStates : {};
    }
}

