import React from 'react';
import { Link } from 'react-router-dom';
import DeckProgress from '@app/component/Deck/DeckProgress';
import DeckActions from '@app/component/DecksManager/DeckActions';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';

import '@app/style/deck.css';

export default class Deck extends React.Component {

    state = {
        deckState: this.props.deck.deckState,
    };

    componentDidUpdate(prevProps) {
        if (this.props.deck !== prevProps.deck) {
            this.setState({ deckState: this.props.deck.deckState });
        }
    }
    
    handleCompletedDeckClick = () => {
        this.props.openResetModal(this.props.deck.deckState);
    };

    isDeckCompleted = () => {
        const { deckState } = this.state;
        if (!deckState) return false;

        const correctCardsNb = deckState.correctCards.length;
        const bannedCardsNb = deckState.bannedCards.length;
        const size = this.props.deck.size - bannedCardsNb;

        return correctCardsNb === size;
    };

    isDeckEmpty = () => {
        let size = this.props.deck.size;

        if (this.state.deckState) {
            const bannedCardsNb = this.state.deckState.bannedCards.length;
            size -= bannedCardsNb;
        }

        return size <= 0;
    };

    hasHiddenCards = () => {
        return this.state.deckState && this.state.deckState.bannedCards.length > 0;
    };

    saveUserThemesOrder = (theme) => {
        const userThemesOrder = JSON.parse(localStorage.getItem('userThemesOrder')) || [];
        const updated = [...userThemesOrder.filter((t) => t !== theme), theme];
        localStorage.setItem('userThemesOrder', JSON.stringify(updated));
    };

    addFocusedClass = (event) => {
        const currentStack = event.currentTarget.closest('.stacked-decks');
        const decks = currentStack.querySelectorAll('.component-deck');
        decks.forEach((deck) => deck.classList.remove('focused'));
        event.currentTarget.classList.add('focused');
    };

    reorderDeckOnFocus = (event) => {
        const currentStack = event.currentTarget.closest('.stacked-decks');
        const decks = Array.from(currentStack.querySelectorAll('.component-deck'));
        const focusedDeck = event.currentTarget;
        const [deck1, deck2, deck3] = decks;

        // Remove all `deck-*` positional classes
        decks.forEach((deck) => {
            deck.classList.forEach((className) => {
                if (/^deck-\d+$/.test(className)) deck.classList.remove(className);
            });
        });

        // Re-assign classes based on which deck is focused
        if (focusedDeck === deck1) {
            deck1.classList.add('deck-1');
            deck2.classList.add('deck-2');
            deck3.classList.add('deck-3');
        } else if (focusedDeck === deck2) {
            deck2.classList.add('deck-1');
            deck3.classList.add('deck-2');
            deck1.classList.add('deck-3');
        } else if (focusedDeck === deck3) {
            deck3.classList.add('deck-1');
            deck1.classList.add('deck-2');
            deck2.classList.add('deck-3');
        }
    };

    handleDeckClick = (e) => {
        const { deck, saveStackedDecksOrder } = this.props;
        if (!deck.isCustom) {
            this.addFocusedClass(e);
            this.reorderDeckOnFocus(e);
            saveStackedDecksOrder(e);
        }
    };

    renderStartButton = () => {
        const { deck } = this.props;

        if (this.isDeckEmpty()) {
            return <ButtonFlat disabled label="Start" customClass="button-start-deck gray" />;
        }

        if (this.isDeckCompleted()) {
            return <ButtonFlat label="Start" onClick={this.handleCompletedDeckClick} customClass={`button-start-deck ${deck.grade}`} />;
        }

        if (deck.isCustom) {
            return (
                <Link to={`/mydecks/quizz/${deck.id}`}>
                    <ButtonFlat label="Start" customClass="button-start-deck" />
                </Link>
            );
        }

        return (
            <Link to={`/learn/quizz/${deck.id}`}>
                <ButtonFlat label="Start" onClick={() => this.saveUserThemesOrder(deck.theme)} customClass={`button-start-deck ${deck.grade}`} />
            </Link>
        );
    };

    render() {
        const { deckState } = this.state;
        const { deck, refreshDecks, openResetModal, openHiddenCardsModal, openEditPage, openDeleteModal, className, saveStackedDecksOrder } = this.props;

        return (
            <div className={className} onClick={this.handleDeckClick}>
                <div className="grade">
                    <p>{deck.grade}</p>
                </div>
                <div className="theme">
                    <h2>{deck.theme}</h2>
                    <p>{deck.krTheme}</p>
                </div>

                <DeckProgress
                    deckState={deckState}
                    deckSize={deck.size}
                    deckId={deck.id}
                    grade={deck.grade}
                />

                <div className="start-button-container">
                    {this.renderStartButton()}
                </div>

                <DeckActions
                    deck={deck}
                    deckState={deckState}
                    refreshDecks={refreshDecks}
                    isCustomDeck={deck.isCustom}
                    isEmptyDeck={this.isDeckEmpty()}
                    hasHiddenCards={this.hasHiddenCards()}
                    openResetModal={openResetModal}
                    openHiddenCardsModal={openHiddenCardsModal}
                    openEditPage={openEditPage}
                    openDeleteModal={openDeleteModal}
                />
            </div>
        );
    }
}