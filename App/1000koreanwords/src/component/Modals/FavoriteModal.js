import React from 'react';
import AuthService from '@app/service/auth.service'
import customDecksData from '@app/data/customdecks.data';
import customCardsData from '@app/data/customcards.data';
import ModalCrossButton from '@app/component/Buttons/ModalCrossButton';
import ButtonPushable from '@app/component/Buttons/ButtonPushable';

import '@app/style/modal.css';
import '@app/style/favoritemodal.css';
import Card from '../Card/Card';

class FavoriteModal extends React.Component {

    selectRef = React.createRef();

    state = {
        deckList: []
    }

    componentDidMount() {
        this.fetchCustomDecks();

    }

    handleBackgroundClick = (event) => {
        if (event.target.className.includes('modal-background')) {
            this.props.onClose();
        }
    }

    copyCardToDeck = (deckId, card) => {
        const userId = AuthService.getCurrentUser().id;

        customCardsData.createCustomCard(userId, card).then(res => {
            customDecksData.pushCardToDeck(userId, deckId, res.cardId);
        });
    }

    fetchCustomDecks = () => {
        const userId = AuthService.getCurrentUser().id;

        customDecksData.getCustomDecks(userId)
            .then(deckList => this.setState({ deckList }));
    }

    renderEmptyList() {
        return <p> You don't have any custom deck. </p>
    }

    renderDeckList() {
        const { deckList } = this.state;
        const { card } = this.props;

        return (

            <>
                <div className="modal-content-decklist">

                    <div className="modal-content-card">
                        <Card card={card} editable={false} inPlay={false} />
                    </div>

                    <div className="dropdown">
                        <select ref={this.selectRef}>
                            <option value="">Select a deck</option>
                            {deckList.map((deck, index) => (
                                <option key={index} value={deck._id}>{deck.theme}</option>
                            ))}
                        </select>
                        <ButtonPushable
                            onClick={() => {
                                const selectedDeckId = this.selectRef.current.value;
                                if (selectedDeckId) {
                                    this.copyCardToDeck(selectedDeckId, card);
                                }
                            }}
                            label="Add"
                            color="blue"
                            size="small"
                        />
                    </div>
                </div>
            </>
        );
    }

    renderHtml() {
        const { onClose } = this.props;
        const { deckList } = this.state;

        return (
            <>
                <div className="modal-header">
                    <div className="close-button-container">
                        <ModalCrossButton handleClick={onClose} />
                    </div>
                    <h2>Save to custom deck</h2>
                    <hr />
                </div>

                <div className="modal-content-favorite">
                    {deckList.length === 0 ? this.renderEmptyList() : this.renderDeckList()}
                </div>

                <div className="modal-footer">
                    <hr />
                    <div className="modal-buttons">
                        <ButtonPushable label="Close" onClick={onClose} color="blue" />
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
                    <div className="modal favorite-modal">
                        {this.renderHtml()}
                    </div>
                </div>
            </div>
        );
    }
}

export default FavoriteModal