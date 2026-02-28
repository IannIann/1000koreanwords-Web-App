import React from 'react';
import ButtonPushable from '@app/component/Buttons/ButtonPushable';
import ButtonGhost from '@app/component/Buttons/ButtonGhost';

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
      this.editColor = "teal";
      this.deleteColor = "red";
    } else
    {
      this.refreshColor = "black";
      this.hideColor = "black";
      this.editColor = "black";
      this.deleteColor = "red";
    }

    return (

      <div className='component-deck-button-group'>
      <ButtonGhost
        onClick={() => openResetModal(deckState)}
        label="pi-refresh"
        isIcon={true}
        color={this.refreshColor}
      />
      <ButtonGhost
        onClick={() => openHiddenCardsModal(deck, deckState)}
        label="pi-eye-slash"
        isIcon={true}
        color={this.hideColor}
      />
      {isCustomDeck && (
        <ButtonGhost
          onClick={() => openEditPage(deck)}
          label="pi-pencil"
          isIcon={true}
          color={this.editColor}
        />
      )}
      {isCustomDeck && (
        <ButtonGhost
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