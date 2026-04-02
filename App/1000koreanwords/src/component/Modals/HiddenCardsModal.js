import React from 'react';
import userdeckstatesData from '@app/data/userdeckstates.data';
import decksData from '@app/data/decks.data';
import customDecksData from '@app/data/customdecks.data';
import Card from '@app/component/Card/Card';
import Loader from '@app/component/Main/Loader';
import ModalButtonClose from '@app/component/Buttons/ModalButtonClose';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import withModalLogic from '@app/component/Modals/withModalLogic';
import '@app/style/modal.css';
import '@app/style/hiddencardsmodal.css';

class HiddenCardsModal extends React.Component {

  state = {
    bannedCards: [],
    isLoading: true,
    prevModalClass: null
  };

  static getDerivedStateFromProps(props, state) {
    if (props.modalClass === 'display' && state.prevModalClass !== 'display') {
      return { bannedCards: [], isLoading: true, prevModalClass: props.modalClass };
    }
    return { prevModalClass: props.modalClass };
  }

  componentDidMount() {
    this.fetchBannedCardsList();
  }

  componentDidUpdate(prevProps) {
    const { modalClass } = this.props
    if (prevProps.modalClass !== modalClass && modalClass === 'display') {
      this.fetchBannedCardsList();
    }
  }

  fetchBannedCardsList = () => {
    const { deckState, deck } = this.props;

    const fetchDeck = deck.isCustom
      ? customDecksData.getCustomDeck
      : decksData.getDeck;

    if (!deckState) {
      this.setState({ isLoading: false });
      return;
    }

    fetchDeck(deck.id).then((res) => {
      const cards = res.deck.cards;
      const bannedCards = deckState.bannedCards;
      const bannedCardsList = cards.filter(card => bannedCards.includes(card._id));

      this.setState({ bannedCards: bannedCardsList, isLoading: false });
    });
  }

  restoreCard = (id) => {
    this.setState(state => ({
      bannedCards: state.bannedCards.filter(card => card._id !== id),
    }));
  }

  onConfirm = () => {
    const { deckState, refreshDecks, onClose } = this.props
    const updatedDeckState = {
      ...deckState,
      bannedCards: this.state.bannedCards
    }

    userdeckstatesData.updateDeckState(updatedDeckState)
      .then(refreshDecks)
      .catch(() => {toast.error('Oops! Something went wrong...');})
      .finally(onClose)
  }

  renderHiddenCards(hasNoHiddenCards) {
    const { bannedCards } = this.state;

    if (hasNoHiddenCards) {
      return <p>You don't have any hidden cards.</p>;
    }

    return (
      <div className="cards-hidden-grid-container">
        <div className="cards-hidden-grid">

          {bannedCards.map((card, index) => (
            <Card
              key={index}
              card={card}
              restoreCard={this.restoreCard}
              isDeletable={true}
            />
          ))}

        </div>
      </div>
    )
  }

  renderHtml(hasNoHiddenCards) {
    const { onClose } = this.props;
    const { isLoading } = this.state;

    return (
      <>
        <div className="modal-header">
          <div className="close-button-container">
            <ModalButtonClose handleClick={onClose} />
          </div>
          <h2>Remove cards from the hide list</h2>
          <hr />
        </div>
        <div className="modal-content">
          {isLoading ? <Loader /> : 
            this.renderHiddenCards(hasNoHiddenCards)
          }
        </div>
        <div className="modal-footer">
          <hr />
          <div className="modal-buttons">
            <ButtonFlat label="Cancel" onClick={onClose} customClass="button-start-deck button-modal red" />
            <ButtonFlat label="Confirm" onClick={this.onConfirm} customClass="button-start-deck button-modal green" />
          </div>
        </div>
      </>
    );
  }

  render() {
    const { modalClass, deck } = this.props;
    const { bannedCards } = this.state;
    const hasNoHiddenCards = !deck || !deck.deckState || bannedCards.length === 0;
    const modalType = hasNoHiddenCards ? 'modal' : 'modal hidden-cards-modal';

    return (
      <div id="modal-container" className={modalClass}>
        <div className="modal-background" onClick={this.props.handleBackgroundClick}>
          <div className={modalType}>

            {this.renderHtml(hasNoHiddenCards)}

          </div>
        </div>
      </div>
    );
  }
}

export default withModalLogic(HiddenCardsModal);