import React from "react";
import ProgressBar from "@app/component/Main/ProgressBar";

export default class QuizzProgress extends React.Component {

  state = {
    scoreIndex: 0,
    maxIndex: 0,
    label: ""
  }

  updateProgress = () => {
    const { scoreIndex, maxIndex, label } = this.props;

    this.setState({
      scoreIndex: scoreIndex,
      maxIndex: maxIndex,
      label: label
    });
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
    const { scoreIndex, maxIndex } = this.state;

    return (
      <div className="component-quizz-progress">
        <ProgressBar current={scoreIndex} total={maxIndex} grade={null} label="QUESTION" />
      </div>
    )
  }
}