import React from 'react';
import ModalCrossButton from '@app/component/Buttons/ModalCrossButton';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import Card from '@app/component/Card/Card'
import withModalLogic from '@app/component/Modals/withModalLogic';

import '@app/style/modal.css';

class HideSingleCardModal extends React.Component {
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
            <ButtonFlat label="No" onClick={onClose} customClass={`button-start-deck button-modal red`} />
            <ButtonFlat label="Yes" onClick={this.hideCard} customClass={`button-start-deck button-modal green`} />
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

export default withModalLogic(HideSingleCardModal)