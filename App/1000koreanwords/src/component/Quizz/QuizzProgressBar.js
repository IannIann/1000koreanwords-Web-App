import React from "react";

import '@app/style/progressbar.css';

export default class QuizzProgressBar extends React.Component {

  
  state = {
    scoreIndex: 0,
    maxIndex: 0,
    progressPercentage : 0
  }

  updateProgress = () => {
    const { scoreIndex, maxIndex } = this.props;

    const progressPercentage = this.calculateProgressPercentage(scoreIndex, maxIndex);

    this.setState({
      scoreIndex: scoreIndex,
      maxIndex: maxIndex,
      progressPercentage: progressPercentage
    });
  }

  calculateProgressPercentage(scoreIndex, maxIndex) {
    if (maxIndex === 0) {
      return 0;
    } else {
      return Math.round((scoreIndex / maxIndex) * 100);
    }
  }

  componentDidMount() {
    this.updateProgress();
  }

  componentDidUpdate(prevProps) {
    const { scoreIndex, maxIndex } = this.props;

    if (scoreIndex !== prevProps.scoreIndex || maxIndex !== prevProps.maxIndex) {
      this.updateProgress();
    }
  }

  render() {
    const { scoreIndex, maxIndex, progressPercentage } = this.state;

    return (
        <div className="progress-container quizz">
          <div className="score quizz">{`${scoreIndex}/${maxIndex}`}</div>
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }} ></div>
        </div>
    );
  }

}
