import React from "react";
import { Link } from "react-router-dom";
import DeckScoreDisplay from '@app/component/Deck/DeckScoreDisplay';
import DeckButtonGroup from '@app/component/Buttons/DeckButtonGroup';
import ButtonPushable from '@app/component/Buttons/ButtonPushable';

import '@app/style/deck.css';

export default class Deck extends React.Component {
  state = {
    deckState: this.props.deck.deckState,
    isCustomDeck: this.props.deck.isCustom
  }

  componentDidUpdate(prevProps) {
    if (this.props.deck !== prevProps.deck) {
      this.updateDeckState(this.props.deck.deckState);
    }
  }

  updateDeckState = (deckState) => {
    this.setState({ deckState });
  }

  handleCompletedDeckClick = () => {
    this.props.openResetModal(this.props.deck.deckState);
  }

  isDeckCompleted = () => {
    if (this.state.deckState) {

      const correctCardsNb = this.state.deckState.correctCards.length;
      const bannedCardsNb = this.state.deckState.bannedCards.length
      const size = this.props.deck.size - bannedCardsNb

      if (correctCardsNb == size)
        return true
    }

    return false;
  }

  isDeckEmpty = () => {

    let size = this.props.deck.size;

    if (this.state.deckState) {
      const bannedCardsNb = this.state.deckState.bannedCards.length
      size = size - bannedCardsNb
    }

    if (size <= 0) {
      return true;
    }
    return false;
  }

  renderStartButton = () => {
    const { deck } = this.props;
    const { isCustomDeck } = this.state;

    if (this.isDeckEmpty()) {
      return (
        <ButtonPushable label="Start" color="gray" />
      );
    }
    else if (this.isDeckCompleted()) {
      return (
        <ButtonPushable label="Start" color="green" onClick={this.handleCompletedDeckClick} />
      );
    } else if (isCustomDeck) {
      return (
        <Link to={`/mydecks/quizz/${deck.id}`}>
          <ButtonPushable label="Start" color="green" />
        </Link>
      );
    } else {
      return (
        <Link to={`/learn/quizz/${deck.id}`}>
          <ButtonPushable label="Start" color="green" />
        </Link>
      );
    }
  }

  addFocusedClass = (event) => {
    const currentStack = event.currentTarget.closest('.stacked-decks');
    const decks = currentStack.querySelectorAll('.component-deck');
    decks.forEach(deck => deck.classList.remove('focused'));
    event.currentTarget.classList.add('focused');
  }

  reorderDeckOnFocus = (event) => {
    const currentStack = event.currentTarget.closest('.stacked-decks');
    const decks = Array.from(currentStack.querySelectorAll('.component-deck'));
    const focusedDeck = event.currentTarget;
    const deck1 = decks[0];
    const deck2 = decks[1];
    const deck3 = decks[2];

    // Remove all `deck-*` classes
    decks.forEach((deck) => {
      deck.classList.forEach((className) => {
        if (/^deck-\d+$/.test(className)) deck.classList.remove(className);
      });
    });

    // Add classes based on new order
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
  }


  render() {
    const {
      deckState,
      isCustomDeck
    } = this.state;

    const {
      deck,
      refreshDecks,
      openResetModal,
      openHiddenCardsModal,
      openEditPage,
      openDeleteModal,
      className,
      saveStackedDecksOrder
    } = this.props;

    return (

      <div className={className}
        onClick={(e) => {
          if (!isCustomDeck) {
            this.addFocusedClass(e);
            this.reorderDeckOnFocus(e);
            saveStackedDecksOrder(e);
          }
        }} >

        <div className="grade">
          <p>{deck.grade}</p>
        </div>
        <div className="theme">
          <h2>{deck.theme}</h2>
          <p>{deck.krTheme}</p>
        </div>

        <DeckScoreDisplay
          deckState={deckState}
          deckSize={deck.size}
          deckId={deck.id}
        />

        <div className="start-button-container">
          {this.renderStartButton()}
        </div>

        <DeckButtonGroup
          deck={deck}
          deckState={deckState}
          refreshDecks={refreshDecks}
          isCustomDeck={isCustomDeck}
          isEmptyDeck={this.isDeckEmpty()}
          openResetModal={openResetModal}
          openHiddenCardsModal={openHiddenCardsModal}
          openEditPage={openEditPage}
          openDeleteModal={openDeleteModal}
        />
      </div>
    );
  }
}