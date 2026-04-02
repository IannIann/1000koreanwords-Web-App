import customdecksData from '@app/data/customdecks.data';
import '@app/style/buttonadddeck.css';

export default function ButtonAddDeck({ refreshDecks, toast }) {
    const handleAddDeckClick = async () => {
        try {
            await customdecksData.createCustomDeck('Custom Deck');
            refreshDecks();
        } catch (error) {
            toast.error(error.message ? JSON.parse(error.message) : 'Failed to create a deck');
        }
    };

    return (
        <button className="component-add-deck-button" onClick={handleAddDeckClick}>
            + Add Deck
        </button>
    );
}