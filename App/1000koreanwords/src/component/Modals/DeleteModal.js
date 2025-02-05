import React from 'react';
import AuthService from '@app/service/auth.service'
import userdeckstatesData from '@app/data/userdeckstates.data';
import customdecksData from '@app/data/customdecks.data';
import ModalCrossButton from '@app/component/Buttons/ModalCrossButton';
import ButtonPushable from '@app/component/Buttons/ButtonPushable';

import '@app/style/modal.css';

class DeleteModal extends React.Component {
  handleBackgroundClick = (event) => {
    if (event.target.className.includes('modal-background')) {
      this.props.onClose();
    }
  }

  deleteDeck = () => {
    const { deck, refreshDecks, onClose} = this.props;
    const userId = AuthService.getCurrentUser().id;
    
    Promise.all([
      customdecksData.deleteCustomDeck(userId, deck.id),
      userdeckstatesData.deleteUserDeckState(userId, deck._id)
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

            <ButtonPushable label="No" onClick={onClose} color="red"/>
            <ButtonPushable label="Yes" onClick={this.deleteDeck} color="green"/>

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