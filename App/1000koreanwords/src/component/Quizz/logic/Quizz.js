import cardsData from '@app/data/cards.data';
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
    updateQuizz(cardId, score, command) {

        if (command === "Show")
            return {
                isAnswered: true,
            };

        if (command === "Wrong"
            || command === "Correct"
            || command === "Ban") {

            let updatedScore = score;

            let nextCardId = incrementCardIndex(cardId);
            let currentCard = getCardAtIndex(cardId);
            let nextCard = getCardAtIndex(nextCardId);
            let isFinished = isQuizzFinished(nextCardId);

            if (command === "Correct") {
                updatedScore = incrementScore(score);
                addCardToCorrectArray(currentCard._id);
            }

            if (command === "Ban") {
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
            : await decksData.getDeckById(deckId);

        cards = filterCardsToPlay(deckState, res.deck[0].cards);
        cards = shuffleCards(cards);
        cards = cards.slice(0, Math.min(maxCard, cards.length));

        return {
            currentWord: buildWordFromCard(cards[0]),
            maxIndex: cards.length,
            card: cards[0]
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

function addCardToCorrectArray(cardId) {
    deckState.correctCards.push(cardId);
}

function addCardToBannedArray(cardId) {
    deckState.bannedCards.push(cardId);
}

function getCardAtIndex(index) {
  if (!isQuizzFinished(index)) {
    const card = cards[index];
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
  return cardIndex >= cards.length;
}

function incrementScore(currentScore) {
    return currentScore + 1;
}

function incrementCardIndex(currentCardIndex) {
    return currentCardIndex + 1;
}