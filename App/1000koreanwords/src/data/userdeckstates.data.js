import apiAccess from '@app/data/httpService';

export default {
    createUserDeckState() {
        return apiAccess.postJson('/userdeckstates/create');
    },
    getUserDeckStates() {
        return apiAccess.GetJson(`/userdeckstates`)
    },
    getSingleDeckState(deckId) {
        return apiAccess.GetJson(`/userdeckstates/${deckId}`)
    },
    updateDeckState(deckState) {
        const userDeckState = {
            deckState
        };

        return apiAccess.PostJson('/userdeckstates/updateDeckState', { userDeckState });
    },
    resetDeckProgression(deckState) {
        const userDeckState = {
            deckState
        }

        return apiAccess.PostJson('/userdeckstates/updateDeckState', { userDeckState });
    },

    deleteCardFromDeckState(deckId, cardId) {
        return apiAccess.DeleteJson('/userdeckstates/deleteCardFromDeckState', { deckId, cardId });
    },

    deleteUserDeckState(deckId)
    {
        return apiAccess.DeleteJson('/userdeckstates/deleteUserDeckState', { deckId });
    }
}