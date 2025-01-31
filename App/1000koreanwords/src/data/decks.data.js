import apiAccess from '@app/data/httpService';

export default {

    getAllDecks() {
        return apiAccess.GetJson('decks_new')
    },
    getDeck(id)
    {
        return apiAccess.GetJson(`decks_new/${id}`)
    }
}