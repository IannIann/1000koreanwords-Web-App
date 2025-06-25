import apiAccess from '@app/data/httpService';

export default {
        createCustomCard(userId, card) {
        return apiAccess.PostJson('customcards/create', {userId, card});
    },

    updateCustomCard(card) {
        return apiAccess.PostJson('customcards/update', {card});
    },

    deleteCustomCard(userId, cardId) {
        return apiAccess.DeleteJson('customcards/delete', {userId, cardId});
    }
}