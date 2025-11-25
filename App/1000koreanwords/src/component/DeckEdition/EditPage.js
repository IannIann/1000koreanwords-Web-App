import React from 'react';
import { toast } from 'react-toastify';
import { withRouter } from '@app/tool/withRouter';
import { Link } from "react-router-dom";
import Card from '@app/component/Card/Card';
import Edition from '@app/component/DeckEdition/logic/Edition';
import DeckName from '@app/component/DeckEdition/DeckName';
import ButtonAddCard from '@app/component/Buttons/ButtonAddCard';
import ButtonPushable from '@app/component/Buttons/ButtonPushable';
import tool from '@app/tool/tool'

import '@app/style/editpage.css';

class EditPage extends React.Component {
    state = {
        deck: {},
        cards: [],
        maxCardsLimit: 0
    };

    componentDidMount() {
        this.loadDeck();
    }

    loadDeck = () => {
        const { deckId } = this.props.router.params;

        Edition.fetchDeck(deckId)
            .then((deck) => this.setState({ deck, cards: deck.cards }))
            .catch(() => {
                this.navigateToMyDecksPage();
                toast.error('Oops! Something went wrong...');
            });

        if (this.state.maxCardsLimit === undefined || this.state.maxCardsLimit === 0) {
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
                toast.error('Failed to change deck theme');
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
            .catch((error) => {
                if (error) {
                    toast.error(tool.getErrorMessage(error));
                }
            });
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
        return cards.map((card, index) => (
            <Card
                key={index}
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
        const { deck } = this.state;

        return (
            <>
                <div className="page-title">Edit deck</div>
                <div className="page-subtitle">Add, delete and customize your flashcards</div>
                <div className="cards-edit-header">
                    <div className="left">
                        <Link to={`/mydecks`}>
                            <ButtonPushable label="↤ Back" color="blue" />
                        </Link></div>
                    <div className="center">
                        <DeckName deck={deck} saveDeckTheme={this.saveDeckTheme} toast={toast} /></div>
                    <div className="right"></div>
                </div>
                <div className="cards-edit-grid-container">
                    <div className="cards-edit-grid">
                        {this.renderCards()}
                        {this.renderButtonAddCard()}
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(EditPage);