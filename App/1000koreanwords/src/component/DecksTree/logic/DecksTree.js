import decksData from '@app/data/decks.data';

var deckList;

export default {
    instantiateDecksTree(grade="Beginner"){
        return decksData.getDecksByLangAndGrade("eng", grade)
        .then((res) => {
            if(res.length)
            deckList = res;

            let treeState = {
                decks: deckList
            }

            return treeState;
        })
        .catch((err) => { console.log(err) });
    }
}