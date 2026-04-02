import React from 'react';
import { toast } from 'react-toastify';
import ModalButtonClose from '@app/component/Buttons/ModalButtonClose';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import withModalLogic from '@app/component/Modals/withModalLogic';
import customdecksData from '@app/data/customdecks.data';
import userdeckstatesData from '@app/data/userdeckstates.data';

import '@app/style/modal.css';

class DeleteModal extends React.Component {

  deleteDeck = () => {
    const { deck, refreshDecks, onClose } = this.props;

    Promise.all([
      customdecksData.deleteCustomDeck(deck.id),
      userdeckstatesData.deleteUserDeckState(deck.id),
    ])
      .then(refreshDecks)
      .catch(() => {toast.error('Oops! Something went wrong...');})
      .finally(onClose);
  }

  render() {
    const { modalClass, onClose } = this.props;

    return (
      <div id="modal-container" className={modalClass}>
        <div className="modal-background" onClick={this.props.handleBackgroundClick}>
          <div className="modal">
            <div className="modal-header">
              <div className="close-button-container">
                <ModalButtonClose handleClick={onClose} />
              </div>
              <h2>Delete deck</h2>
              <hr />
            </div>

            <div className="modal-content">
              <p>Do you want to delete this deck?</p>
            </div>

            <div className="modal-footer">
              <hr />
              <div className="modal-buttons">
                <ButtonFlat label="No" onClick={onClose} customClass="button-start-deck button-modal red" />
                <ButtonFlat label="Yes" onClick={this.deleteDeck} customClass="button-start-deck button-modal green" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withModalLogic(DeleteModal);