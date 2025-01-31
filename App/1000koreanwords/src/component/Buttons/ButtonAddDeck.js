import React from "react";
import AuthService from '@app/service/auth.service'
import customdecksData from '@app/data/customdecks.data';

import '@app/style/buttonadddeck.css';


export default class ButtonAddDeck extends React.Component {

  handleAddDeckClick = () => {
    const userId = AuthService.getCurrentUser().id;
    const theme = 'Custom Deck';

    customdecksData.createCustomDeck(userId, theme)
      .then(() => {
        this.props.refreshDecks();
      }).catch(() => {
        this.props.toast.error('Failed to create a deck');
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
