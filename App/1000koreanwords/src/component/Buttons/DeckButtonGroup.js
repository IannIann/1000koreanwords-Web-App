import React from 'react';
import ButtonPushable from '@app/component/Buttons/ButtonPushable';

import '@app/style/deckbuttongroup.css';


class DeckButtonGroup extends React.Component {
  render() {
    const { 
      openResetModal,
      openHiddenCardsModal,
      openEditPage,
      openDeleteModal,
      deckState,
      deck,
      isCustomDeck,
      isEmptyDeck
    } = this.props;

    if(isCustomDeck && isEmptyDeck) {
      this.refreshColor = "gray";
      this.hideColor = "gray";
      this.editColor = "green";
      this.deleteColor = "red";
    } else
    {
      this.refreshColor = "blue";
      this.hideColor = "blue";
      this.editColor = "blue";
      this.deleteColor = "red";
    }

    return (

      <div className='component-deck-button-group'>
      <ButtonPushable
        onClick={() => openResetModal(deckState)}
        label="pi-refresh"
        isIcon={true}
        color={this.refreshColor}
      />
      <ButtonPushable
        onClick={() => openHiddenCardsModal(deck, deckState)}
        label="pi-eye-slash"
        isIcon={true}
        color={this.hideColor}
      />
      {isCustomDeck && (
        <ButtonPushable
          onClick={() => openEditPage(deck)}
          label="pi-pencil"
          isIcon={true}
          color={this.editColor}
        />
      )}
      {isCustomDeck && (
        <ButtonPushable
          onClick={() => openDeleteModal(deck)}
          label="pi-trash"
          isIcon={true}
          color={this.deleteColor}
        />
      )}
    </div>
    );
  }
}

export default DeckButtonGroup;