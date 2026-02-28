import React from "react";
import '@app/style/progressbar.css';

const TOTAL_SEGS = 10;

export default class DeckScoreDisplay extends React.Component {

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

  componentDidMount() { this.updateDeckScore(); }

  componentDidUpdate(prevProps) {
    const { deckId, deckState } = this.props;
    if (deckId !== prevProps.deckId || deckState !== prevProps.deckState) {
      this.updateDeckScore();
    }
  }

  renderSegments(pct) {
    const filled  = Math.floor(pct / 100 * TOTAL_SEGS);
    const partial = (pct / 100 * TOTAL_SEGS) - filled;

    return Array.from({ length: TOTAL_SEGS }, (_, i) => {
      let cls = 'progress-seg';
      let style = {};

      if (i < filled) {
        cls += ' filled';
      } else if (i === filled && partial > 0) {
        cls += ' partial';
        style['--partial'] = `${(partial * 100).toFixed(1)}%`;
      }

      return <div key={i} className={cls} style={style} />;
    });
  }

  render() {
    const { progressPercentage } = this.state;
    const { grade, variant } = this.props;
    // variant="quizz" for the quizz mode (wider, taller)

    return (
      <div className={`component-deck-score ${variant ? variant : ''}`}>
        <div className="progress-meta">
          <span className="progress-label">Progress</span>
          <span className={`progress-pct`}>
            {progressPercentage}%
          </span>
        </div>
        <div className={`progress-segments level-${grade} ${variant ? variant : ''}`}>
          {this.renderSegments(progressPercentage)}
        </div>
      </div>
    );
  }
}