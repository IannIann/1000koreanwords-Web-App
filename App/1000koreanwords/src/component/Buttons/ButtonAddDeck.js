import React from "react";
import AuthService from '@app/service/auth.service'
import customdecksData from '@app/data/customdecks.data';

import '@app/style/buttonadddeck.css';


export default class ButtonAddDeck extends React.Component {

  handleAddDeckClick = () => {
    const theme = 'Custom Deck';

    customdecksData.createCustomDeck(theme)
      .then(() => {
        this.props.refreshDecks();
      }).catch((error) => {
        if (error.message) {
          this.props.toast.error(JSON.parse(error.message));
        } else {
          this.props.toast.error('Failed to create a deck');
        }
      });
  };

  render() {
    return (
        <button className="component-add-deck-button" onClick={this.handleAddDeckClick}>
          + Add Deck
          </button>
    );
  }
};
