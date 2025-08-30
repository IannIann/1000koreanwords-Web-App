import React from "react";
import AuthService from '@app/service/auth.service'
import customDecksData from '@app/data/customdecks.data';
import customCardsData from '@app/data/customcards.data';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class CustomDecksDialog extends React.Component {

    state = {
        isVisible: false,
        deckList: []
    }

    componentDidUpdate(prevProps) {
        const { isVisible } = this.props;
        const { isVisible: wasVisible } = prevProps;

        if (wasVisible !== isVisible) {
            this.setState({ isVisible });

            if (isVisible) {
                this.fetchCustomDecks();
            }
        }
    }

    handleAddClick = (deckId, card) => {
        this.copyCardToDeck(deckId, card);
    }

    copyCardToDeck(deckId, card) {

        customCardsData.createCustomCard(card).then(res => {
            customDecksData.pushCardToDeck(deckId, res.cardId);
        });
    }

    fetchCustomDecks = () => {
        customDecksData.getCustomDecks()
            .then(deckList => this.setState({ deckList }));
    }

    onConfirm = () => {
        this.closeDialog();
    }

    onCancel = () => {
        this.closeDialog();
    }

    closeDialog = () => {
        this.setState({ isVisible: false });
        this.props.hideCustomDecks();
    }

    renderFooter() {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={this.onCancel} className="p-button-text" />
                <Button label="Confirm" icon="pi pi-check" onClick={this.onConfirm} autoFocus />
            </div>
        );
    }

    renderEmptyList() {
        return <p> You don't have any custom deck. </p>
    }

    renderDeckList() {
        const { deckList } = this.state;
        const { card } = this.props;

        return deckList.map((deck, index) => (
            <div key={index}>
                {deck.theme}
                <button onClick={() => this.handleAddClick(deck._id, card)}>
                    Add
                </button>
            </div>
        ));
    }


    render() {
        const { isVisible, deckList } = this.state;

        return (
            <div className="component-custom-decks-dialog">
                <Dialog
                    header="Add this word to"
                    visible={isVisible}
                    style={{ width: '50vw' }}
                    footer={this.renderFooter()}
                    onHide={this.onCancel}
                >
                    {deckList.length === 0 ? this.renderEmptyList() : this.renderDeckList()}
                </Dialog>
            </div>
        );
    }
}

export { CustomDecksDialog }