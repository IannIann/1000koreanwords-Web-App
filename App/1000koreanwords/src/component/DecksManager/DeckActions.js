import ButtonGhost from '@app/component/Buttons/ButtonGhost';
import '@app/style/deckactions.css';

function DeckActions({ openResetModal, openHiddenCardsModal, openEditPage, openDeleteModal, deckState, deck, isCustomDeck, isEmptyDeck, hasHiddenCards }) {
  const isEmpty = isCustomDeck && isEmptyDeck;
  const refreshColor = isEmpty ? 'gray' : 'black';
  const editColor = isEmpty ? 'teal' : 'black';
  const eyeColor = hasHiddenCards ? 'black' : 'gray';

  return (
    <div className="component-deck-actions">
      <ButtonGhost
        onClick={() => openResetModal(deckState)}
        label="pi-refresh"
        isIcon={true}
        color={refreshColor}
      />
      <ButtonGhost
        onClick={() => openHiddenCardsModal(deck, deckState)}
        label="pi-eye-slash"
        isIcon={true}
        color={eyeColor}
      />
      {isCustomDeck && (
        <ButtonGhost
          onClick={() => openEditPage(deck)}
          label="pi-pencil"
          isIcon={true}
          color={editColor}
        />
      )}
      {isCustomDeck && (
        <ButtonGhost
          onClick={() => openDeleteModal(deck)}
          label="pi-trash"
          isIcon={true}
          color="red"
        />
      )}
    </div>
  );
}

export default DeckActions;