import decksData from '@app/data/decks.data';
import customdecksData from '@app/data/customdecks.data';
import userdeckstatesData from '@app/data/userdeckstates.data';
import AuthService from '@app/service/auth.service'

var deckState = {
    deckId: 0,
    correctCards: [],
    bannedCards: []
}

var cards;
var maxCard = 5;

export default {
    updateQuizz(cardIndex, score, command) {

        if (command === "Show")
            return {
                isAnswered: true,
            };

        if (command === "Wrong"
            || command === "Correct"
            || command === "Hide") {

            let updatedScore = score;

            let nextCardIndex = incrementCardIndex(cardIndex);
            let currentCard = getCardAtIndex(cardIndex);
            let nextCard = getCardAtIndex(nextCardIndex);
            let isFinished = isQuizzFinished(nextCardIndex);

            if (command === "Correct") {
                updatedScore = incrementScore(score);
                addCardToCorrectArray(currentCard._id);
            }

            if (command === "Hide") {
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
                cardIndex: nextCardIndex,
                score: updatedScore,
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

        return {
            maxIndex: cards.length,
            card: cards[0],
            theme : theme
        }
    },
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
    correctCards: [],
  };
}

async function updateDeckState() {
    let userId = AuthService.getCurrentUser().id
    await userdeckstatesData.updateDeckState(userId, deckState);
}

function addCardToCorrectArray(cardIndex) {
    deckState.correctCards.push(cardIndex);
}

function addCardToBannedArray(cardIndex) {
    deckState.bannedCards.push(cardIndex);
}

function getCardAtIndex(index) {
  if (!isQuizzFinished(index)) {
    const card = cards[index];
    return card;
  }
}

function buildWordFromCard(card) {
    const word = {
        question: card.question,
        answer: card.answer
    };

    return word;
}

function isQuizzFinished(cardIndex) {
    return cardIndex >= cards.length;
}

function incrementScore(currentScore) {
    return currentScore + 1;
}

function incrementCardIndex(currentCardIndex) {
    return currentCardIndex + 1;
}