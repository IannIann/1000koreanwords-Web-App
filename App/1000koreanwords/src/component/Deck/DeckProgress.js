import React from "react";
import ProgressBar from "@app/component/Main/ProgressBar";

const TOTAL_SEGS = 10;

export default class DeckProgress extends React.Component {

  state = {
    deckSize: 0,
    deckScore: 0,
    progressPercentage: 0
  }

  updateDeckScore = () => {
    const { deckState, deckSize } = this.props;

    let correctCardsCount = deckState ? deckState.correctCards.length : 0;
    let bannedCardsCount  = deckState ? deckState.bannedCards.length  : 0;
    const deckSizeWithoutBannedCards = deckSize - bannedCardsCount;
    const progressPercentage = this.calculateProgressPercentage(correctCardsCount, deckSizeWithoutBannedCards);

    this.setState({
      deckSize:  deckSizeWithoutBannedCards,
      deckScore: correctCardsCount,
      progressPercentage
    });
  }

  calculateProgressPercentage(deckScore, deckSize) {
    if (deckSize === 0) return 0;
    return Math.round((deckScore / deckSize) * 100);
  }

  componentDidMount() { 
    this.updateDeckScore(); 
  }

  componentDidUpdate(prevProps) {
    const { deckId, deckState } = this.props;
    if (deckId !== prevProps.deckId || deckState !== prevProps.deckState) {
      this.updateDeckScore();
    }
  }
  render() {
    const { progressPercentage } = this.state;
    const { grade } = this.props;

    return (
      <div className={`component-deck-progress`}>
        <ProgressBar progressPercentage={progressPercentage} grade={grade} />
      </div>
    );
  }
}