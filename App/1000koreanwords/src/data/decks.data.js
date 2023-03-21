import apiAccess from "./httpService";

export default {
    getDecksByLangAndGrade(lang, grade) {
        return apiAccess.GetJson(`decks/${lang}/${grade}/`)
    },
    getDeckById(id)
    {
        return apiAccess.GetJson(`decks/${id}`)
    },
    getCustomDecks()
    {
        return apiAccess.GetJson(`decks/custom/${userId}`)
    }
}