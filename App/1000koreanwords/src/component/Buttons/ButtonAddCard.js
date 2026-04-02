import '@app/style/buttonaddcard.css';

export default function ButtonAddCard({ addCard }) {
    return (
        <button className="component-add-card-button" onClick={addCard}>
            + Add New Card
        </button>
    );
}