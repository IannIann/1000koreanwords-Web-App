import decksData from '@app/data/decks.data';
import userdeckstatesData from '@app/data/userdeckstates.data';
import AuthService from '@app/service/auth.service'

var deckList;
var deckState;

export default {
    instantiateDecks(grade="Beginner"){
        return decksData.getDecksByLangAndGrade("eng", grade)
        .then((res) => {
            if(res.length)
                deckList = res;
                
            return deckList;
        })
        .catch((err) => { console.log(err) });
    },

    instantiateUserDeckStates(){

        let userId = AuthService.getCurrentUser().id;

        return userdeckstatesData.getUserDeckStatesById(userId)
        .then((res) => {
            if(res._id)
                deckState = res;
                
            return deckState;
        })
        .catch((err) => { console.log(err) });
    }
}