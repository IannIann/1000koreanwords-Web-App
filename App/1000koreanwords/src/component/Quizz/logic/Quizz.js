import cardsData from '@app/data/cards.data';
import decksData from '@app/data/decks.data';
import userdeckstatesData from '@app/data/userdeckstates.data';
import AuthService from '@app/service/auth.service'

var deckState = {
    deckId: 0,
    correctCards: [],
    bannedCards: []
}

var cardList;
var maxCard = 15;

export default {
    updateQuizz(cardId, score, buttonName) {

        if (buttonName === "Show")
            return {
                isAnswered: true,
            };

        if (buttonName === "Wrong"
            || buttonName === "Correct"
            || buttonName === "Ban") {

            let updatedScore = score;

            let nextCardId = incrementcardIndex(cardId);
            let currentCard = getCard(cardId);
            let nextCard = getCard(nextCardId);
            let isFinished = isQuizzFinished(nextCardId);

            if (buttonName === "Correct") {
                updatedScore = incrementScore(score);
                addCardToCorrectArray(currentCard._id);
            }

            if (buttonName === "Ban") {
                updatedScore = incrementScore(score);
                addCardToBannedArray(currentCard._id);
            }

            if (isFinished) {
                updateDeckState();

                return {
                    isFinished: isFinished,
                    score: updatedScore
                }
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

    async instantiateQuizzDeck(deckId) {

        //Getting deck state from user
        let userId = AuthService.getCurrentUser().id
        let ds = await userdeckstatesData.getSingleDeckState(userId, deckId);

        if (ds.length > 0) 
            deckState = ds[0];
        else
            deckState.deckId = deckId; //just adding the deckId and using an empty deckstate if no result


        return decksData.getDeckById(deckId)
            .then((res) => {

                cardList = res.result[0].cards;
                cardList = setCardListToPlay(deckState, cardList);

                shuffleCards(cardList);

                if(cardList.length > maxCard)
                    cardList = shortenCardList(cardList, maxCard);

                let quizzState = {
                    currentWord: buildWordFromCard(cardList[0]),
                    maxIndex: cardList.length
                }

                return quizzState;
            })
            .catch((err) => { console.log(err) });
    },


};

//Internal func
function setCardListToPlay(deckState, allCards)
{
    const cardsToRemove = new Set(deckState.correctCards.concat(deckState.bannedCards));
    const cardList = allCards.filter((card) => {
        return !cardsToRemove.has(card._id);
    })

    return cardList;
}

function shuffleCards(cardList)
{
    return cardList.sort(() => Math.random() - 0.5);
}

function shortenCardList(cardList, maxCard)
{
    return cardList.slice(0, maxCard)
}

function updateDeckState() {
    let userId = AuthService.getCurrentUser().id
    
    userdeckstatesData.updateDeckState(userId, deckState)
    .then((res) => {
        console.log(res);
    });
}

function addCardToCorrectArray(cardId) {
    deckState.correctCards.push(cardId);
}

function addCardToBannedArray(cardId) {
    deckState.bannedCards.push(cardId);
}

function getCard(cardIndex) {
    if (!isQuizzFinished(cardIndex)) {
        let card = cardList[cardIndex];
        return card;
    }
}

function buildWordFromCard(card) {
    let word = {
        question: card.word,
        answer: card.wordTranslated.eng
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