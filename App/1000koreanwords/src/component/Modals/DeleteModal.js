import React from 'react';
import AuthService from '@app/service/auth.service'
import userdeckstatesData from '@app/data/userdeckstates.data';
import customdecksData from '@app/data/customdecks.data';
import ModalCrossButton from '@app/component/Buttons/ModalCrossButton';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';

import '@app/style/modal.css';

class DeleteModal extends React.Component {
  handleBackgroundClick = (event) => {
    if (event.target.className.includes('modal-background')) {
      this.props.onClose();
    }
  }

  deleteDeck = () => {
    const { deck, refreshDecks, onClose} = this.props;
    
    Promise.all([
      customdecksData.deleteCustomDeck(deck.id),
      userdeckstatesData.deleteUserDeckState(deck.id)
    ])
      .then(refreshDecks)
      .catch(() => {/*TODO: toast error*/  })
      .finally(() => {
        onClose();
      });
  }

  renderHtml() {
    const { onClose } = this.props;

    return (
    <>  
        <div className="modal-header">
          <div className="close-button-container">
            <ModalCrossButton handleClick={onClose} />
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
            <ButtonFlat label="No" onClick={onClose} customClass={`button-start-deck button-modal red`} />
            <ButtonFlat label="Yes" onClick={this.deleteDeck} customClass={`button-start-deck button-modal green`} />
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

export default DeleteModal