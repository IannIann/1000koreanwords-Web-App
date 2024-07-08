import React from "react";
import { Button } from 'primereact/button';

export default class CommandButton extends React.Component {

  handleClick = () => {
    this.props.clickHandler(this.props.command);
  };

  render() {
    return (
      <div className="component-button">
        <Button onClick={this.handleClick}>{this.props.name}</Button>
      </div>
    );
  }
}