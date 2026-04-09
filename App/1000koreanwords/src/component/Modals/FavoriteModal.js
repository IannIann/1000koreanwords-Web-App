import React from 'react';
import customDecksData from '@app/data/customdecks.data';
import customCardsData from '@app/data/customcards.data';
import ModalButtonClose from '@app/component/Buttons/ModalButtonClose';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import ButtonGhost from '@app/component/Buttons/ButtonGhost';
import withModalLogic from '@app/component/Modals/withModalLogic';
import tool from '@app/tool/tool';
import Card from '@app/component/Card/Card';
import Loader from '@app/component/Main/Loader';
import { toast } from 'react-toastify';
import '@app/style/modal.css';
import '@app/style/favoritemodal.css';

class FavoriteModal extends React.Component {

  state = {
    deckList: [],
    selectedDeckId: '',
    isLoading: true
  };

  componentDidMount() {
    this.fetchCustomDecks();
  }

  handleSelectChange = (event) => {
    this.setState({ selectedDeckId: event.target.value });
  };

  fetchCustomDecks = () => {
    this.setState({ isLoading: true });
    customDecksData.getCustomDecks()
      .then(deckList => this.setState({ deckList, isLoading: false }));
  };

  copyCardToDeck = (deckId, card) => {
    customCardsData.createCustomCard(card)
      .then(res => customDecksData.pushCardToDeck(deckId, res.cardId)
        .then(() => toast.success('Card successfully added to deck'))
        .catch(error => toast.error(tool.getErrorMessage(error)))
      )
      .finally(() => this.setState({ selectedDeckId: '' }));
  };

  renderEmptyList() {
    return <p>You don't have any custom deck.</p>;
  }

  renderDeckList() {
    const { deckList, selectedDeckId } = this.state;
    const { card } = this.props;

    return (
      <div className="modal-content-decklist">
        <div className="modal-content-card">
          <Card card={card} editable={false} inPlay={false} />
        </div>

        <div className="dropdown-container">
          <select value={selectedDeckId} onChange={this.handleSelectChange}>
            <option value="">Select a deck</option>
            {deckList.map((deck, index) => (
              <option key={index} value={deck._id}>{deck.theme}</option>
            ))}
          </select>

          <ButtonGhost
            label="Add"
            color={selectedDeckId === '' ? 'gray' : 'black'}
            position="center"
            onClick={() => selectedDeckId && this.copyCardToDeck(selectedDeckId, card)}
          />
        </div>
      </div>
    );
  }

  render() {
    const { onClose, modalClass } = this.props;
    const { isLoading } = this.state;

    return (
      <div id="modal-container" className={modalClass}>
        <div className="modal-background" onClick={this.props.handleBackgroundClick}>
          <div className="modal">
            <div className="modal-header">
              <div className="close-button-container">
                <ModalButtonClose handleClick={onClose} />
              </div>
              <h2>Save to custom deck</h2>
              <hr />
            </div>

            <div className="modal-content">
              {isLoading ? <Loader /> : 
                this.state.deckList.length === 0 ? this.renderEmptyList() : 
                this.state.deckList.length > 0 ? this.renderDeckList() : null
              }
            </div>

            <div className="modal-footer">
              <hr />
              <div className="modal-buttons">
                <ButtonFlat label="Close" onClick={onClose} customClass="button-start-deck button-modal green" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withModalLogic(FavoriteModal);