import decksData from '@app/data/decks.data';
import customdecksData from '@app/data/customdecks.data';
import userdeckstatesData from '@app/data/userdeckstates.data';
import AuthService from '@app/service/auth.service'

var deckState = {
    deckId: 0,
    correctCards: [],
    bannedCards: []
}

var score = {
    wrongCards: [],
    correctCards: []
}

var cards;
var maxCard = 5;

export default {
    updateQuizz(cardIndex, command) {

        if (command === "Show")
            return {
                isAnswered: true,
            };

        if (command === "Wrong"
            || command === "Correct"
            || command === "Hide") {

            let currentCard = getCardAtIndex(cardIndex);
            updateScore(command, currentCard);
            updateLocalDeckState(command, currentCard);

            let nextCardIndex = cardIndex + 1;
            let nextCard = getCardAtIndex(nextCardIndex);
            let isFinished = isQuizzFinished(nextCardIndex);


            if (isFinished) {
                return {
                    isFinished: isFinished,
                    cardIndex: nextCardIndex,
                    score : score
                }
            }

            return {
                isAnswered: false,
                cardIndex: nextCardIndex,
                isFinished: isFinished,
                card: nextCard
            }
        }
    },

    async instantiateQuizzDeck(deckId, isCustomDeck) {

        //Getting deck state from user
        const userId = AuthService.getCurrentUser().id;
        const userDeckState = await userdeckstatesData.getSingleDeckState(userId, deckId);

        deckState = userDeckState.length > 0 ? userDeckState[0] : createDeckState(deckId);

        const res = isCustomDeck
            ? await customdecksData.getCustomDeck(deckId, userId)
            : await decksData.getDeck(deckId);

        cards = filterCardsToPlay(deckState, res.deck[0].cards);
        cards = shuffleCards(cards);
        cards = cards.slice(0, Math.min(maxCard, cards.length));

        let theme = res.deck[0].theme;

        //Reseting the score
        score = {
            wrongCards: [],
            correctCards: []
          }

        return {
            maxIndex: cards.length,
            card: cards[0],
            theme : theme
        }
    },
    
    async checkDeckFullCompletion(deckId, isCustomDeck) {

        const userId = AuthService.getCurrentUser().id;
        const userDeckState = await userdeckstatesData.getSingleDeckState(userId, deckId);

        const res = isCustomDeck
            ? await customdecksData.getCustomDeck(deckId, userId)
            : await decksData.getDeck(deckId);

        const deckSize = res.deck[0].cards.length;
        const correctCardsLength = userDeckState[0].correctCards.length;
        const bannedCardsLength = userDeckState[0].bannedCards.length;

        return correctCardsLength + bannedCardsLength >= deckSize;
    },

    async updateDeckState() {
        let userId = AuthService.getCurrentUser().id
        return userdeckstatesData.updateDeckState(userId, deckState);
    }
};

function filterCardsToPlay(deckState, allCards) {
  const { correctCards, bannedCards } = deckState;
  const cardsToRemove = new Set([...correctCards, ...bannedCards]);
  const playableCards = allCards.filter(card => !cardsToRemove.has(card._id));

  return playableCards;
}

//Shuffles an array of cards in-place using the Fisher-Yates algorithm.
function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function createDeckState(deckId) {
  return {
    deckId,
    bannedCards: [],
    correctCards: []
  };
}

function updateLocalDeckState(command, card) {
    if (command === "Correct") {
        deckState.correctCards.push(card._id);
    } else if (command === "Hide") {
        deckState.bannedCards.push(card._id);
    }
}

function updateScore(command, card) {
    if(command === "Wrong")
        score.wrongCards.push(card);
    else if (command === "Correct")
        score.correctCards.push(card);
}

function getCardAtIndex(index) {
  if (!isQuizzFinished(index)) {
    const card = cards[index];
    return card;
  }
}

function isQuizzFinished(cardIndex) {
    return cardIndex >= cards.length;
}