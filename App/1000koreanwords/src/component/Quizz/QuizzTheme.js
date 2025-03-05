
import React from "react";
import ButtonPushable from '@app/component/Buttons/ButtonPushable';
import { Link } from "react-router-dom";

import '@app/style/quizztheme.css';

export default class QuizzTheme extends React.Component {
    render() {
        const { theme, isFinished, navigateToLearnPage } = this.props;

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
                  <Link to={`/mydecks`}>
                    <ButtonPushable label="Restart" color="blue" />
                  </Link>
                )}
              </div>
            </div>
        );
    }
}