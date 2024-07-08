import apiAccess from "./httpService";

export default {
    createUserDeckState(userId) {
        return apiAccess.postJson('/userdeckstates/create', { userId });
    },
    getUserDeckStatesById(id) {
        return apiAccess.GetJson(`userdeckstates/${id}`)
    },
    getSingleDeckState(userId, deckId) {
        return apiAccess.GetJson(`userdeckstates/${userId}/${deckId}`)
    },
    updateDeckState(userId, deckState) {
        const userDeckState = {
            userId,
            deckState
        };

        return apiAccess.PostJson('userdeckstates/updateDeckState', { userDeckState });
    },
    resetDeckProgression(userId, deckState) {
        const userDeckState = {
            userId,
            deckState
        }

        return apiAccess.PostJson('userdeckstates/updateDeckState', { userDeckState });
    }
}