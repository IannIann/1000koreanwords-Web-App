import React from 'react';
import customDecksData from '@app/data/customdecks.data';
import customCardsData from '@app/data/customcards.data';
import ModalCrossButton from '@app/component/Buttons/ModalCrossButton';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import ButtonGhost from '@app/component/Buttons/ButtonGhost';
import { toast } from 'react-toastify';
import tool from '@app/tool/tool'

import '@app/style/modal.css';
import '@app/style/favoritemodal.css';
import Card from '../Card/Card';

class FavoriteModal extends React.Component {

    selectRef = React.createRef();

    state = {
        deckList: [],
        selectedDeckId: "" 
    }

    componentDidMount() {
        this.fetchCustomDecks();
    }

    handleBackgroundClick = (event) => {
        if (event.target.className.includes('modal-background')) {
            this.props.onClose();
        }
    }

    handleSelectChange = (event) => {
        this.setState({ selectedDeckId: event.target.value });
    };

    copyCardToDeck = (deckId, card) => {
        customCardsData.createCustomCard(card)
            .then((res) => customDecksData.pushCardToDeck(deckId, res.cardId)
                .then(() => toast.success('Card added to deck'))
                .catch((error) => toast.error(tool.getErrorMessage(error))
                ))
    }

    fetchCustomDecks = () => {
        customDecksData.getCustomDecks()
            .then(deckList => this.setState({ deckList }));
    }

    renderEmptyList() {
        return <p> You don't have any custom deck. </p>
    }

    renderDeckList() {
        const { deckList, selectedDeckId } = this.state;
        const { card } = this.props;

        return (
            <>
                <div className="modal-content-decklist">

                    <div className="modal-content-card">
                        <Card card={card} editable={false} inPlay={false} />
                    </div>

                    <div className="dropdown-container">
                        <select ref={this.selectRef} value={selectedDeckId} onChange={this.handleSelectChange}>
                            <option value="">Select a deck</option>
                            {deckList.map((deck, index) => (
                                <option key={index} value={deck._id}>{deck.theme}</option>
                            ))}
                        </select>

                        <ButtonGhost
                            label="Add"
                            color={selectedDeckId === "" ? "gray" : "black"}
                            disabled={false}
                            position="center"
                            onClick={() => {
                                if (selectedDeckId) {
                                    this.copyCardToDeck(selectedDeckId, card);
                                }
                            }}
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

                <div className="modal-content">
                    {deckList.length === 0 ? this.renderEmptyList() : this.renderDeckList()}
                </div>

                <div className="modal-footer">
                    <hr />
                    <div className="modal-buttons">
                        <ButtonFlat label="Close" onClick={onClose} customClass={`button-start-deck button-modal green`} />
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