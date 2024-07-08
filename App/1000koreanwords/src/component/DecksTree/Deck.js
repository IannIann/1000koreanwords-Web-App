import React from "react";
import DeckScoreDisplay from "./DeckScoreDisplay";
import { Link } from "react-router-dom";
import { showResetConfirmDialog } from '@app/component/QuizzOptionMenu/ResetDialog'
import OptionsMenu from '@app/component/QuizzOptionMenu/OptionsMenu';

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

  updateDeckState = _deckstate => {
    this.setState({ deckState: _deckstate });
  }

  handleCompletedDeckClick = () => {
    showResetConfirmDialog(this.props.deck.deckState, this.props.refreshDecks);
  }

  isDeckCompleted = () => {
    if (this.state.deckState) {

      let correctCardsNb = this.state.deckState.correctCards.length;
      let bannedCardsNb = this.state.deckState.bannedCards.length
      let size = this.props.deck.size - bannedCardsNb

      if (correctCardsNb == size)
        return true
    }

    return false;
  }

  isDeckEmpty = () => {
    if (this.props.deck.size <= 0) {
      return true;
    }
    return false;
  }

  showDeckButton = () => {
    const { deck } = this.props;
    const { isCustomDeck } = this.state;

    if (this.isDeckCompleted()) {
      return (
        <button onClick={this.handleCompletedDeckClick}>
          {deck.name}
        </button>
      );
    } else if (this.isDeckEmpty()) {
      return (
        <button disabled>
          {deck.name}
        </button>
      );
    } else if (isCustomDeck) {
      return (
        <Link to={`/mydecks/quizz/${deck.id}`}>
          <button>{deck.name}</button>
        </Link>
      );
    } else {
      return (
        <Link to={`/learn/quizz/${deck.id}`}>
          <button>{deck.name}</button>
        </Link>
      );
    }
  }

  render() {

    const { deckState, isCustomDeck } = this.state;
    const { deck, refreshDecks } = this.props;

    return (
      <div className="component-deck">
        <DeckScoreDisplay
          deckState={deckState}
          deckSize={deck.size}
          deckId={deck.id}
        />

        {this.showDeckButton()}

        <OptionsMenu
          deck={deck}
          deckState={deckState}
          refreshDecks={refreshDecks}
          isCustomDeck={isCustomDeck}
        />
      </div>
    );
  }
}