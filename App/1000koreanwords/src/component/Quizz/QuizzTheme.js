
import React from "react";
import ButtonPushable from '@app/component/Buttons/ButtonPushable';
import { Link } from "react-router-dom";

import '@app/style/quizztheme.css';

export default class QuizzTheme extends React.Component {

  render() {
    const { theme, krTheme, isFinished, navigateToLearnPage, restartQuizz, isDeckFullyCompleted } = this.props;

    let restartBtnColor = "green";

    if (isDeckFullyCompleted) {
      restartBtnColor = "gray";
    }

    return (
      <div className="quizz-theme-header">
        <div className="left">
          {isFinished && (
            <ButtonPushable size="small" label="↤ Back" color="blue" onClick={navigateToLearnPage} />
          )}
        </div>

        <div className="center">
          <div className="page-title">{theme}</div>
          <div className="page-subtitle">{krTheme}</div>
        </div>

        <div className="right">
          {isFinished && (
            <ButtonPushable size="small" label="Restart ⭯" color={restartBtnColor} onClick={restartQuizz} />
          )}
        </div>
      </div>
    );
  }
}