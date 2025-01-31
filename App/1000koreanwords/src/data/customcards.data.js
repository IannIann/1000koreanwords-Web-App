import apiAccess from '@app/data/httpService';

export default {
        createCustomCard(userId, card) {
        return apiAccess.PostJson('customcards_new/create', {userId, card});
    },

    updateCustomCard(card) {
        return apiAccess.PostJson('customcards_new/update', {card});
    },

    deleteCustomCard(userId, cardId) {
        return apiAccess.DeleteJson('customcards_new/delete', {userId, cardId});
    }
}