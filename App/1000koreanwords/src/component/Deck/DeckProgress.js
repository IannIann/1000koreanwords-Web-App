import ProgressBar from '@app/component/Main/ProgressBar';

export default function DeckProgress({ deckState, deckSize, grade }) {
    const correctCardsCount = deckState ? deckState.correctCards.length : 0;
    const bannedCardsCount = deckState ? deckState.bannedCards.length : 0;
    const size = deckSize - bannedCardsCount;
    const progressPercentage = size === 0 ? 0 : Math.round((correctCardsCount / size) * 100);

    return (
        <div className="component-deck-progress">
            <ProgressBar progressPercentage={progressPercentage} grade={grade} label="PROGRESS" />
        </div>
    );
}