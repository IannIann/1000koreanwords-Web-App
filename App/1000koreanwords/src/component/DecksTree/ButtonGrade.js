import React from "react";

export default class ButtonGrade extends React.Component {

  handleClick = () => {
    this.props.clickHandler(this.props.grade);
  };

  render() {
    return (
      <div className="component-button-grade">
          <button onClick={this.handleClick}>{this.props.grade}</button>
      </div>
    );
  }
}