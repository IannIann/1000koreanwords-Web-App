import userdeckstatesData from '@app/data/userdeckstates.data';
import ModalButtonClose from '@app/component/Buttons/ModalButtonClose';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import withModalLogic from '@app/component/Modals/withModalLogic';
import '@app/style/modal.css';

function ResetModal({ deckState, refreshDecks, onClose, modalClass, handleBackgroundClick }) {
  const resetDeck = () => {
    if (deckState) {
      const newDeckState = { ...deckState, correctCards: [] };
      userdeckstatesData.resetDeckProgression(newDeckState)
        .then(refreshDecks)
        .catch(() => {toast.error('Oops! Something went wrong...');})
        .finally(onClose);
    } else {
      onClose();
    }
  };

  return (
    <div id="modal-container" className={modalClass}>
      <div className="modal-background" onClick={handleBackgroundClick}>
        <div className="modal">
          <div className="modal-header">
            <div className="close-button-container">
              <ModalButtonClose handleClick={onClose} />
            </div>
            <h2>Reset deck</h2>
            <hr />
          </div>

          <div className="modal-content">
            <p>Do you want to reset the deck progression?</p>
          </div>

          <div className="modal-footer">
            <hr />
            <div className="modal-buttons">
              <ButtonFlat label="No" onClick={onClose} customClass="button-start-deck button-modal red" />
              <ButtonFlat label="Yes" onClick={resetDeck} customClass="button-start-deck button-modal green" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withModalLogic(ResetModal);
