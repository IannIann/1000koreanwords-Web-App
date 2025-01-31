import React from "react";

import '@app/style/progressbar.css';

export default class QuizzProgressBar extends React.Component {

  
  state = {
    currentIndex: 0,
    maxIndex: 0,
    progressPercentage : 0
  }

  updateProgress = () => {
    const { currentIndex, maxIndex } = this.props;

    const progressPercentage = this.calculateProgressPercentage(currentIndex, maxIndex);

    this.setState({
      currentIndex: currentIndex,
      maxIndex: maxIndex,
      progressPercentage: progressPercentage
    });
  }

  calculateProgressPercentage(currentIndex, maxIndex) {
    if (maxIndex === 0) {
      return 0;
    } else {
      return Math.round((currentIndex / maxIndex) * 100);
    }
  }

  componentDidMount() {
    this.updateProgress();
  }

  componentDidUpdate(prevProps) {
    const { currentIndex, maxIndex } = this.props;

    if (currentIndex !== prevProps.currentIndex || maxIndex !== prevProps.maxIndex) {
      this.updateProgress();
    }
  }

  render() {
    const { currentIndex, maxIndex, progressPercentage } = this.state;

    return (
        <div className="progress-container quizz">
          <div className="score quizz">{`${currentIndex}/${maxIndex}`}</div>
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }} ></div>
        </div>
    );
  }

}
