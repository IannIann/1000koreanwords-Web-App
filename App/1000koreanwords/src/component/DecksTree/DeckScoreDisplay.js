import React from "react";

export default class DeckScoreDisplay extends React.Component {

  updateDeckScore() {
    if (this.props.deckState) {

      let correctCardsNb = this.props.deckState.correctCards.length;
      let bannedCardsNb = this.props.deckState.bannedCards.length
      let size = this.props.deckSize - bannedCardsNb

      this.setState({ deckSize: size, deckScore: correctCardsNb })
    } else {
      this.setState({ deckSize: this.props.deckSize, deckScore: 0 })
    }
  }

  componentDidMount() {
    this.updateDeckScore();
  }

  componentDidUpdate(prevProps) {
    if (this.props.deckId !== prevProps.deckId) {
      this.updateDeckScore();
    }

    if (this.props.deckState !== prevProps.deckState) {
      this.updateDeckScore();
    }
  }

  state = {
    deckSize: 0,
    deckScore: 0
  }

  render() {
    return (
      <div key={this.state.deckScore} className="component-score-label">
        {this.state.deckScore} / {this.state.deckSize}
      </div>
    );
  }
}