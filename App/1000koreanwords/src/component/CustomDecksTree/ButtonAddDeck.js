import React from "react";
import AuthService from '@app/service/auth.service'
import customdecksData from '@app/data/customdecks.data';

export default class ButtonAddDeck extends React.Component {

  handleAddDeckClick = () => {
    const userId = AuthService.getCurrentUser().id;
    const deckName = 'Custom Deck';
    const language = 'eng';

    customdecksData.createCustomDeck(userId, deckName, language)
      .then(() => {
        this.props.refreshDecks();
      });
  };

  render() {
    return (
      <div className="custom-deck-button">
        <button onClick={this.handleAddDeckClick}>Add Deck</button>
      </div>
    );
  }
};
