import React from 'react';
import userdeckstatesData from '@app/data/userdeckstates.data';
import ModalCrossButton from '@app/component/Buttons/ModalCrossButton';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import withModalLogic from '@app/component/Modals/withModalLogic';
import '@app/style/modal.css';

class ResetModal extends React.Component {
  resetDeck = () => {
    const { deckState, refreshDecks, onClose } = this.props;

    if (deckState) {
      const newDeckState = { ...deckState, correctCards: [] };
      userdeckstatesData.resetDeckProgression(newDeckState)
        .then(refreshDecks)
        .finally(onClose);
    }
    else {
      onClose();
    }
  }

  renderHtml() {
    const { onClose } = this.props;

    return (
      <>
        <div className="modal-header">
          <div className="close-button-container">
          <ModalCrossButton handleClick={onClose} />
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
            <ButtonFlat label="No" onClick={onClose} customClass={`button-start-deck button-modal red`} />
            <ButtonFlat label="Yes" onClick={this.resetDeck} customClass={`button-start-deck button-modal green`} />
          </div>
        </div>
      </>
    );
  }

  render() {
    const { modalClass } = this.props;

    return (
      <div id="modal-container" className={modalClass}>
        <div className="modal-background" onClick={this.handleBackgroundClick}>
          <div className="modal">
            {this.renderHtml()}
          </div>
        </div>
      </div>
    );
  }
}

export default withModalLogic(ResetModal);