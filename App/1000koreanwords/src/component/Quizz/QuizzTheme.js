
import React from "react";

import '@app/style/quizztheme.css';

export default class QuizzTheme extends React.Component {

  render() {
    const { theme, krTheme } = this.props;

    return (
      <div className="quizz-theme-header">
        <div className="center">
          <div className="page-title">{theme}</div>
          <div className="page-subtitle">{krTheme}</div>
        </div>
      </div>
    );
  }
}