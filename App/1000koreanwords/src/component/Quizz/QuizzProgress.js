import React from "react";
import ProgressBar from "@app/component/Main/ProgressBar";

export default class QuizzProgress extends React.Component {

  state = {
    scoreIndex: 0,
    maxIndex: 0,
    progressPercentage: 0
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
    const { progressPercentage } = this.state;

    return (
      <div className="component-quizz-progress">
        <ProgressBar progressPercentage={progressPercentage}/>
      </div>
    )
  }
}