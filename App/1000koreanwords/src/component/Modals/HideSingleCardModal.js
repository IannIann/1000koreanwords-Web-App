import React from 'react';
import ModalCrossButton from '@app/component/Buttons/ModalCrossButton';
import ButtonPushable from '@app/component/Buttons/ButtonPushable';
import Card from '@app/component/Card/Card'

import '@app/style/modal.css';

class HideSingleCardModal extends React.Component {
  handleBackgroundClick = (event) => {
    if (event.target.className.includes('modal-background')) {
      this.props.onClose();
    }
  }

  hideCard = () => {

    this.props.commandHandler("Hide");
    this.props.onClose();

  }

  renderHtml() {
    const { onClose, card } = this.props;

    return (
      <>
        <div className="modal-header">
          <div className="close-button-container">
            <ModalCrossButton handleClick={onClose} />
          </div>
          <h2>Hide this card ?</h2>
          <hr />  
        </div>

        <div className="modal-content">
          <Card card={card} editable={false} inPlay={false} />
        </div>

        <div className="modal-footer">
          <hr />
          <div className="modal-buttons">

            <ButtonPushable label="No" onClick={onClose} color="red" />
            <ButtonPushable label="Yes" onClick={this.hideCard} color="green" />

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

export default HideSingleCardModal