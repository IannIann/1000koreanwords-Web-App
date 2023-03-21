import apiAccess from "./httpService";

export default {
    createUserDeckStates(id) {
        return apiAccess.PostJson('userdeckstates/create', { id })
            .then((res) => {
                return res;
            })
    },
    getUserDeckStatesById(id) {
        return apiAccess.GetJson(`userdeckstates/${id}`)
    },
    getSingleDeckState(userId, deckId) {
        return apiAccess.GetJson(`userdeckstates/${userId}/${deckId}`)
    },
    updateDeckState(userId, deckState) {

        let userDeckState = {
            userId: userId,
            deckState: deckState
        }

        return apiAccess.PostJson('userdeckstates/updateDeckState', { userDeckState })
            .then((res) => {
                return res;
            })
    },
    resetDeckProgression(userId, deckState) {
        let userDeckState = {
            userId: userId,
            deckState: deckState
        }

        return apiAccess.PostJson('userdeckstates/updateDeckState', { userDeckState })
            .then((res) => {
                return res;
            })
    }
}