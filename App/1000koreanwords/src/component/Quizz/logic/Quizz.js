import cardsData from '@app/data/cards.data';
import decksData from '@app/data/decks.data';

var cardList;

export default {
    updateQuizz(cardId, score, buttonName) {

        if (buttonName === "Show") 
            return {
                isAnswered: true,
            };

        if (buttonName === "Wrong" || buttonName === "Correct") {

            let updatedScore = score;
            let nextCardId = incrementcardIndex(cardId);
            let nextCard = getCard(nextCardId);
            let isFinished = isQuizzFinished(nextCardId);

            if (buttonName === "Correct") {
                updatedScore = incrementScore(score);
            }

            if(isFinished)
                return {
                    isFinished: isFinished,
                    score: updatedScore
                }

            return {
                isAnswered: false,
                cardId: nextCardId,
                currentWord: buildWordFromCard(nextCard),
                score: updatedScore,
                isFinished: isFinished
            }
        }
    },

    instantiateQuizz() {
        return cardsData.getAllCards()
            .then((res) => {
                cardList = res;

                let quizzState = {
                    currentWord: buildWordFromCard(cardList[0]),
                    maxIndex: cardList.length
                }

                return quizzState;
            })
            .catch((err) => { console.log(err) });
    },

    instantiateQuizzDeck(deckId){
        return decksData.getDeckById(deckId)
        .then((res) => {

            console.log(res.result[0].cards);
            cardList = res.result[0].cards;

            let quizzState = {
                currentWord: buildWordFromCard(cardList[0]),
                maxIndex: cardList.length
            }

            return quizzState;
        })
        .catch((err) => { console.log(err) });
    }
};

//Internal func
function getCard(cardIndex) {
    if (!isQuizzFinished(cardIndex)) {
        let card = cardList[cardIndex];
        return card;
    }
}

function buildWordFromCard(card)
{
    let word = { 
        question : card.word, 
        answer : card.wordTranslated.eng
    };

    return word;
}

function isQuizzFinished(cardIndex) {
    if (cardIndex >= cardList.length) {
        return true;
    }
    else {
        return false;
    }
}

function incrementScore(score) {
    return score += 1;
}

function incrementcardIndex(cardId) {
    return cardId += 1;
}
