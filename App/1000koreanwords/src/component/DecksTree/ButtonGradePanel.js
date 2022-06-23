import React from "react";
import ButtonGrade from "./ButtonGrade"

export default class ButtonGradePanel extends React.Component {

  handleClick = grade => {
    this.props.clickHandler(grade);
  };

  render() {
    return (
      <div className="component-button-grade-panel">
          <ButtonGrade grade="Beginner" clickHandler={this.handleClick} />
          <ButtonGrade grade="Intermediate" clickHandler={this.handleClick} />
          <ButtonGrade grade="Advanced" clickHandler={this.handleClick} />
      </div>
    );
  }
}