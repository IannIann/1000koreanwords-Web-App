import React from "react";
import '@app/style/buttonaddcard.css'
export default class ButtonAddCard extends React.Component {

  handleAddCardClick = () => {
    this.props.addCard();
  };

  render() {
    return (
      <button className="component-add-card-button"
        onClick={this.handleAddCardClick}>
        + Add New Card
      </button>
    );
  }
};
