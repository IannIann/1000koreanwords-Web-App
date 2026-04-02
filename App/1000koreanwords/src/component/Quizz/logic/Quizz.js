import decksData from '@app/data/decks.data';
import customdecksData from '@app/data/customdecks.data';
import userdeckstatesData from '@app/data/userdeckstates.data';

const MAX_CARDS = 20;

let deckState = {
    deckId: 0,
    correctCards: [],
    bannedCards: []
};

let score = {
    wrongCards: [],
    correctCards: []
};

let cards;
let totalDeckCards = 0;

export default {
    updateQuizz(cardIndex, command) {
        if (command === 'Show')
            return { isAnswered: true };

        if (command === 'Wrong' || command === 'Correct' || command === 'Hide') {
            const currentCard = getCardAtIndex(cardIndex);
            updateScore(command, currentCard);
            updateLocalDeckState(command, currentCard);

            const nextCardIndex = cardIndex + 1;
            const isFinished = isQuizzFinished(nextCardIndex);

            if (isFinished) {
                const isDeckFullyCompleted = deckState.correctCards.length + deckState.bannedCards.length >= totalDeckCards;
                return {
                    isFinished,
                    cardIndex: nextCardIndex,
                    score,
                    isDeckFullyCompleted
                };
            }

            return {
                isAnswered: false,
                cardIndex: nextCardIndex,
                isFinished,
                card: getCardAtIndex(nextCardIndex)
            };
        }
    },

    async instantiateQuizzDeck(deckId, isCustomDeck) {
        const userDeckState = await userdeckstatesData.getSingleDeckState(deckId);
        deckState = userDeckState.length > 0 ? userDeckState[0] : createDeckState(deckId);

        const res = isCustomDeck
            ? await customdecksData.getCustomDeck(deckId)
            : await decksData.getDeck(deckId);

        const { theme, krTheme, cards: deckCards } = res.deck;

        totalDeckCards = deckCards.length;
        cards = shuffleCards(filterCardsToPlay(deckState, deckCards))
            .slice(0, Math.min(MAX_CARDS, deckCards.length));

        score = { wrongCards: [], correctCards: [] };

        return { maxIndex: cards.length, card: cards[0], theme, krTheme };
    },

    async updateDeckState() {
        return userdeckstatesData.updateDeckState(deckState);
    }
};

function filterCardsToPlay(state, allCards) {
    const cardsToRemove = new Set([...state.correctCards, ...state.bannedCards]);
    return allCards.filter(card => !cardsToRemove.has(card._id));
}

function shuffleCards(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function createDeckState(deckId) {
    return { deckId, bannedCards: [], correctCards: [] };
}

function updateLocalDeckState(command, card) {
    if (command === 'Correct') deckState.correctCards.push(card._id);
    else if (command === 'Hide') deckState.bannedCards.push(card._id);
}

function updateScore(command, card) {
    if (command === 'Wrong') score.wrongCards.push(card);
    else if (command === 'Correct') score.correctCards.push(card);
}

function getCardAtIndex(index) {
    if (!isQuizzFinished(index)) return cards[index];
}

function isQuizzFinished(cardIndex) {
    return cardIndex >= cards.length;
}