import React from 'react';
import AuthService from '@app/service/auth.service'
import userdeckstatesData from '@app/data/userdeckstates.data';
import decksData from '@app/data/decks.data';
import customdecks from '@app/data/customdecks.data';
import Card from '@app/component/Card/Card';
import ModalCrossButton from '@app/component/Buttons/ModalCrossButton';
import ButtonPushable from '@app/component/Buttons/ButtonPushable';
import '@app/style/modal.css';
import '@app/style/hiddencardsmodal.css';


class HiddenCardsModal extends React.Component {

  state = {
    bannedCards: [],
    modalType: ""
  }

  componentDidMount() {
    this.fetchBannedCardsList();
  }

  componentDidUpdate(prevProps) {
    const { modalClass } = this.props

    if (prevProps.modalClass !== modalClass) {
      this.fetchBannedCardsList();
    }
  }

  fetchBannedCardsList = () => {
    const { deckState, deck } = this.props;

    const fetchDeck = deck.isCustom
      ? customdecks.getCustomDeck
      : decksData.getDeck

    if (deckState) {
      fetchDeck(deck.id).then((res) => {
        const cards = res.deck[0].cards;
        const bannedCards = deckState.bannedCards;
        const bannedCardsList = cards.filter(card => bannedCards.includes(card._id));

        this.setState({ bannedCards: bannedCardsList });
      });
    }
  }

  restoreCard = (id) => {
    this.setState(state => ({
      bannedCards: state.bannedCards.filter(card => card._id !== id),
    }));
  }

  handleBackgroundClick = (event) => {
    if (event.target.className.includes('modal-background')) {
      this.props.onClose();
    }
  }

  onConfirm = () => {
    const { deckState, refreshDecks, onClose } = this.props
    const updatedDeckState = {
      ...deckState,
      bannedCards: this.state.bannedCards
    }

    userdeckstatesData.updateDeckState(updatedDeckState)
      .then(refreshDecks)
      .finally(onClose)
  }

  renderHiddenCards(hasNoHiddenCards) {
    const { bannedCards } = this.state;

    if (hasNoHiddenCards) {
      return <div> <p>You don't have any hidden cards.</p></div>
    }

    return (
      <div className="cards-hidden-grid-container">
        <div className="cards-hidden-grid">

          {bannedCards.map((card, index) => (
            <Card
              key={index}
              card={card}
              restoreCard={this.restoreCard}
              isDeletable={true }
            />
          ))}

        </div>
      </div>
    )
  }

  renderHtml(hasNoHiddenCards) {
    const { onClose } = this.props;

    return (
      <>
        <div className="modal-header">
          <div className="close-button-container">
          <ModalCrossButton handleClick={onClose} />
          </div>
          <h2>Remove cards from the hidden list</h2>
          <hr />
        </div>
        <div className="modal-content">
          {this.renderHiddenCards(hasNoHiddenCards)}
        </div>
        <div className="modal-footer">
          <hr />
          <div className="modal-buttons">

            <ButtonPushable label="Cancel" onClick={onClose} color="red"/>
            <ButtonPushable label="Confirm" onClick={this.onConfirm} color="green"/>
            
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
        <div className="modal-background" onClick={this.handleBackgroundClick}>
          <div className={modalType}>

            {this.renderHtml(hasNoHiddenCards)}

          </div>
        </div>
      </div>
    );
  }
}

export default HiddenCardsModal