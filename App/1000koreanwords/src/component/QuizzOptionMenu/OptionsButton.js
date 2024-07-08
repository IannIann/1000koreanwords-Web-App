import React from "react";

export default class OptionsButton extends React.Component {

  handleClick = e => {
    this.props.clickHandler(e);
  };

  render() {
    return (
      <div className="component-options-button">
        <button onClick={this.handleClick}>{this.props.name}</button>
      </div>
    );
  }
}