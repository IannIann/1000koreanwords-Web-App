import apiAccess from '@app/data/httpService';

export default {
    createCustomCard(card) {
        return apiAccess.PostJson('/customcards/create', { card });
    },

    updateCustomCard(card) {
        return apiAccess.PostJson('/customcards/update', { card });
    },

    deleteCustomCard(cardId) {
        return apiAccess.DeleteJson('/customcards/delete', { cardId });
    }
}