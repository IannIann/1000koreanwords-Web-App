import React from "react";

export default class Button extends React.Component {

  handleClick = () => {
    this.props.clickHandler(this.props.name);
  };

  render() {
    return (
      <div className="component-button">
        <button onClick={this.handleClick}>{this.props.name}</button>
      </div>
    );
  }
}