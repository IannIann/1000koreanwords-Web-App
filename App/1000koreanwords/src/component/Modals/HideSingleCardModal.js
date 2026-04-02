import ModalButtonClose from '@app/component/Buttons/ModalButtonClose';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import Card from '@app/component/Card/Card';
import withModalLogic from '@app/component/Modals/withModalLogic';

import '@app/style/modal.css';

function HideSingleCardModal({ onClose, card, modalClass, commandHandler, handleBackgroundClick }) {
  const hideCard = () => {
    commandHandler('Hide');
    onClose();
  };

  return (
    <div id="modal-container" className={modalClass}>
      <div className="modal-background" onClick={handleBackgroundClick}>
        <div className="modal">
          <div className="modal-header">
            <div className="close-button-container">
              <ModalButtonClose handleClick={onClose} />
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
              <ButtonFlat label="No" onClick={onClose} customClass="button-start-deck button-modal red" />
              <ButtonFlat label="Yes" onClick={hideCard} customClass="button-start-deck button-modal green" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withModalLogic(HideSingleCardModal);
