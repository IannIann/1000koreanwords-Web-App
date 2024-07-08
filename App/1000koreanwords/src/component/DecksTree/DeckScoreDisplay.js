import React from "react";

export default class DeckScoreDisplay extends React.Component {
  
  state = {
    deckSize: 0,
    deckScore: 0
  }

  updateDeckScore = () => {
    const { deckState, deckSize } = this.props;
    let correctCardsCount = deckState ? deckState.correctCards.length : 0;
    let bannedCardsCount = deckState ? deckState.bannedCards.length : 0;
    const deckSizeWithoutBannedCards = deckSize - bannedCardsCount;

    this.setState({
      deckSize: deckSizeWithoutBannedCards,
      deckScore: correctCardsCount,
    });
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
    return (
      <div className="component-score-label">
        {this.state.deckScore} / {this.state.deckSize}
      </div>
    );
  }
}