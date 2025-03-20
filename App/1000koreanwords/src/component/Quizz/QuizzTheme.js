
import React from "react";
import ButtonPushable from '@app/component/Buttons/ButtonPushable';
import { Link } from "react-router-dom";

import '@app/style/quizztheme.css';

export default class QuizzTheme extends React.Component {

  render() {
    const { theme, isFinished, navigateToLearnPage, restartQuizz, isDeckFullyCompleted } = this.props;

    let restartBtnColor = "blue";

    if (isDeckFullyCompleted) {
      restartBtnColor = "gray";
    }

    return (
      <div className="quizz-theme-header">
        <div className="left">
          {isFinished && (
            <ButtonPushable label="Home" color="blue" onClick={navigateToLearnPage} />
          )}
        </div>

        <div className="center">
          <h1>{theme}</h1>
        </div>

        <div className="right">
          {isFinished && (
            <ButtonPushable label="Restart" color={restartBtnColor} onClick={restartQuizz} />
          )}
        </div>
      </div>
    );
  }
}