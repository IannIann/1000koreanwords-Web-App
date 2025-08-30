import React from "react";
import { Link } from "react-router-dom";
import DeckScoreDisplay from '@app/component/Deck/DeckScoreDisplay';
import DeckButtonGroup from '@app/component/Buttons/DeckButtonGroup';
import ButtonPushable from '@app/component/Buttons/ButtonPushable';

import '@app/style/deck.css';

export default class CustomDeck extends React.Component {
  state = {
    deckState: this.props.deck.deckState
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

    if (this.isDeckEmpty()) {
      return (
        <ButtonPushable label="Start" color="gray" />
      );
    }
    else if (this.isDeckCompleted()) {
      return (
        <ButtonPushable label="Start" color="green" onClick={this.handleCompletedDeckClick}/> 
      );
    } else {
      return (
          <Link to={`/mydecks/quizz/${deck.id}`}>
            <ButtonPushable label="Start" color="green"/> 
          </Link>
      );
    }
  }

  render() {
    const {
      deckState
    } = this.state;

    const {
      deck,
      refreshDecks,
      openResetModal,
      openHiddenCardsModal,
      openEditPage,
      openDeleteModal,
    } = this.props;

    return (

      <div className='component-deck' >

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
          isCustomDeck={true}
          openResetModal={openResetModal}
          openHiddenCardsModal={openHiddenCardsModal}
          openEditPage={openEditPage}
          openDeleteModal={openDeleteModal}
        />
      </div>
    );
  }
}