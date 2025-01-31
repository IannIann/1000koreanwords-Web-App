import React from 'react';
import AuthService from '@app/service/auth.service'
import userdeckstatesData from '@app/data/userdeckstates.data';
import ModalCrossButton from '@app/component/Buttons/ModalCrossButton';
import ButtonPushable from '@app/component/Buttons/ButtonPushable';
import '@app/style/modal.css';

class ResetModal extends React.Component {
  handleBackgroundClick = (event) => {
    if (event.target.className.includes('modal-background')) {
      this.props.onClose();
    }
  }

  resetDeck = () => {
    const { deckState, refreshDecks, onClose } = this.props;

    if (deckState) {
      const userId = AuthService.getCurrentUser().id
      const newDeckState = { ...deckState, correctCards: [] };
      userdeckstatesData.resetDeckProgression(userId, newDeckState)
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
          <ButtonPushable label="No" onClick={onClose} color="red"/>
          <ButtonPushable label="Yes" onClick={this.resetDeck} color="green"/>
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
          <div className="modal text-modal">
            {this.renderHtml()}
          </div>
        </div>
      </div>
    );
  }
}

export default ResetModal