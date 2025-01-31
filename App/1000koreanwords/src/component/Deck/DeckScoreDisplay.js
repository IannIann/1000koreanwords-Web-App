import React from "react";

import '@app/style/progressbar.css';

export default class DeckScoreDisplay extends React.Component {
  
  state = {
    deckSize: 0,
    deckScore: 0,
    progressPercentage : 0
  }

  updateDeckScore = () => {
    const { deckState, deckSize } = this.props;

    let correctCardsCount = deckState ? deckState.correctCards.length : 0;
    let bannedCardsCount = deckState ? deckState.bannedCards.length : 0;
    const deckSizeWithoutBannedCards = deckSize - bannedCardsCount;
    const progressPercentage = this.calculateProgressPercentage(correctCardsCount, deckSizeWithoutBannedCards);

    this.setState({
      deckSize: deckSizeWithoutBannedCards,
      deckScore: correctCardsCount,
      progressPercentage: progressPercentage
    });
  }

  calculateProgressPercentage(deckScore, deckSize) {
    if (deckSize === 0) {
      return 0;
    } else {
      return Math.round((deckScore / deckSize) * 100);
    }
  }

  componentDidMount() {
    this.updateDeckScore();
  }

  componentDidUpdate(prevProps) {
    const { deckId, deckState } = this.props;

    // Check if either the deckId or deckState has changed
    if (deckId !== prevProps.deckId || deckState !== prevProps.deckState) {
      this.updateDeckScore();
    }
  }

  render() {
    const { deckSize, deckScore, progressPercentage } = this.state;

    return (
      <div className="component-deck-score">
        <div className="progress-container">
          <div className="score">{deckScore} / {deckSize}</div>
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }} ></div>
        </div>
      </div>
    );
  }
}
