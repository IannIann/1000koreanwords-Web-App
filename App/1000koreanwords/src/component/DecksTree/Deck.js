import React from "react";
import DeckScoreDisplay from "./DeckScoreDisplay";
import { Link } from "react-router-dom";
import { showResetConfirmDialog } from '@app/component/QuizzOptionMenu/ResetDialog'
import OptionsMenu from '@app/component/QuizzOptionMenu/OptionsMenu';

export default class Deck extends React.Component {
  state = {
    deckState: this.props.deck.deckState
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
    showResetConfirmDialog(this.props.deck.deckState, this.updateDeckState);
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

  showDeckButton() {
    //Open reset dialog if progression is already 100%
    if (this.isDeckCompleted()) {
      return (
        <button onClick={this.handleCompletedDeckClick}>{this.props.deck.name}</button>
      )
    } else {
      return (
        <Link to={"/learn/quizz/" + this.props.deck.id}>
          <button>{this.props.deck.name}</button>
        </Link>
      )
    }
  }

  render() {
    return (
      <div className="component-deck">

        <DeckScoreDisplay
          deckState={this.state.deckState}
          deckSize={this.props.deck.size}
          deckId={this.props.deck.id} />

        {this.showDeckButton()}

        <OptionsMenu deck={this.props.deck} updateDeckStateDisplay={this.updateDeckState} />

      </div>
    );
  }
}