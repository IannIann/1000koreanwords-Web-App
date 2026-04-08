import React from 'react';
import { toast } from 'react-toastify';
import { withRouter } from '@app/tool/withRouter';
import { Link } from "react-router-dom";
import Card from '@app/component/Card/Card';
import Edition from '@app/component/DeckEdition/logic/Edition';
import DeckName from '@app/component/DeckEdition/DeckName';
import ButtonAddCard from '@app/component/Buttons/ButtonAddCard';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import Loader from '@app/component/Main/Loader';
import tool from '@app/tool/tool';

import '@app/style/editpage.css';

class EditPage extends React.Component {
    state = {
        deck: {},
        cards: [],
        maxCardsLimit: 0,
        isLoading: true
    };

    componentDidMount() {
        this.loadDeck();
    }

    loadDeck = () => {
        const { deckId } = this.props.router.params;

        Edition.fetchDeck(deckId)
            .then((deck) => {
                const cards = deck.cards.sort((a, b) => a._id.localeCompare(b._id));
                this.setState({ deck, cards, isLoading: false });
            })
            .catch(() => {
                this.navigateToMyDecksPage();
                toast.error('Oops! Something went wrong...');
            });

        if (!this.state.maxCardsLimit) {
            Edition.getDeckCardsLimit()
                .then((maxCardsLimit) => this.setState({ maxCardsLimit }))
        }
    };

    saveDeckTheme = (theme) => {
        const { deck } = this.state;
        const savedTheme = deck.theme;

        this.setState({ deck: { ...deck, theme } });

        Edition.updateDeck({ ...deck, theme })
            .then(() => toast.success('Deck theme successfully updated'))
            .catch(() => {
                this.setState({ deck: { ...deck, theme: savedTheme } });
                toast.error('Failed to update deck theme');
            });
    };

    saveCard = (updatedCard) => {
        const { cards } = this.state;
        const cardIndex = cards.findIndex((card) => card._id === updatedCard._id);
        const savedCard = cards[cardIndex];

        const updatedCards = [...cards];
        updatedCards[cardIndex] = updatedCard;
        this.setState({ cards: updatedCards });

        Edition.updateCard(updatedCard)
            .then(() => toast.success('Card successfully updated'))
            .catch(() => {
                updatedCards[cardIndex] = savedCard;
                this.setState({ cards: updatedCards });
                toast.error('Failed to save card');
            });
    };

    addCard = () => {
        const { deck } = this.state;

        Edition.createCustomCard()
            .then((res) => Edition.pushToDeck(deck._id, res.cardId))
            .then(() => this.loadDeck())
            .catch((error) => toast.error(tool.getErrorMessage(error)));
    };

    deleteCard = (card) => {
        const { deck } = this.state;

        Edition.deleteCard(deck._id, card._id)
            .then(() => this.loadDeck())
            .catch(() => toast.error('Failed to delete card'));
    };

    navigateToMyDecksPage = () => {
        this.props.router.navigate('/mydecks');
    };

    renderCards = () => {
        const { cards } = this.state;
        return cards.map(card => (
            <Card
                key={card._id}
                card={card}
                editable
                saveCard={this.saveCard}
                deleteCard={this.deleteCard}
            />
        ));
    };

    renderButtonAddCard = () => {
        const { cards, maxCardsLimit } = this.state;
        return cards.length < maxCardsLimit && <ButtonAddCard addCard={this.addCard} />;
    };

    render() {
        const { deck, isLoading } = this.state;

        if (isLoading) return <Loader />;

        return (
                <div className="component-deck-edit fill-available-space">
                <div className="page-title">Edit deck</div>
                <div className="page-subtitle">Add, delete and customize your flashcards</div>
                <div className="cards-edit-header">
                    <div className="left">
                        <Link to="/mydecks">
                            <ButtonFlat label="Back" customClass="button-back" />
                        </Link>
                    </div>
                    <div className="center">
                        <DeckName deck={deck} saveDeckTheme={this.saveDeckTheme} />
                    </div>
                    <div className="right" />
                </div>

                <div className="cards-edit-grid-container">
                    <div className="cards-edit-grid">
                        {this.renderCards()}
                        {this.renderButtonAddCard()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditPage);