import React from "react";
import AuthService from '@app/service/auth.service'
import userdeckstatesData from '@app/data/userdeckstates.data';
import decksData from '@app/data/decks.data';
import customdecks from '@app/data/customdecks.data';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Card from '@app/component/Card/Card';

class BanListDialog extends React.Component {

    state = {
        isVisible: false,
        bannedCards: []
    }

    componentDidUpdate(prevProps) {
        const { isVisible, deckState, deck } = this.props;
        const { isVisible: wasVisible } = prevProps;
        const userId = AuthService.getCurrentUser().id

        if (isVisible !== wasVisible) {
            this.setState({ isVisible });

            const fetchDeck = deck.isCustom 
            ? customdecks.getCustomDeck
            : decksData.getDeckById

            if (isVisible && deckState) {
                fetchDeck(deck.id, userId).then((res) => {
                        console.log(res);
                        const cards = res.deck[0].cards;
                        const bannedCards = deckState.bannedCards;
                        const bannedCardsList = cards.filter(card => bannedCards.includes(card._id));

                        this.setState({ bannedCards: bannedCardsList });
                    });
            }
        }
    }
    
    removeCardFromBanList = cardIdToRestore => {
        this.setState(state => ({
            bannedCards: state.bannedCards.filter(card => card._id !== cardIdToRestore),
        }));
    };

    onClickRestore = id => {
        this.removeCardFromBanList(id);
    }

    onConfirm = () => {
        const userId = AuthService.getCurrentUser().id
        const { deckState, refreshDecks } = this.props
        const updatedDeckState = {
            ...deckState,
            bannedCards: this.state.bannedCards
        }

        userdeckstatesData.updateDeckState(userId, updatedDeckState)
            .then(refreshDecks)
            .finally(this.closeDialog)
    }

    onCancel = () => {
        this.closeDialog();
    }

    closeDialog = () => {
        this.setState({ isVisible: false });
        this.props.hideBanList();
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
        return <p> List of removed cards is empty. </p>
    }

    renderBanList() {
        const { deck } = this.props;
        const { bannedCards } = this.state;

        if (!deck.deckState) {
            return this.renderEmptyList();
        }

        if (bannedCards.length === 0) {
            return this.renderEmptyList();
        }

        return (
            bannedCards.map((card, index) => (
                <div key={index}>
                    <Card question={card.word} answer={card.wordTranslated.eng}/>
                    <button onClick={() => this.onClickRestore(card._id)}>Restore</button>
                </div>
            ))
        );
    }

    render() {
        return (
            <div className="component-ban-list-dialog">
                <Dialog header="Removed cards" visible={this.state.isVisible} style={{ width: '30vw' }} footer={this.renderFooter()} onHide={() => this.onCancel()}>
                    {this.renderBanList()}
                </Dialog>
            </div>
        );
    }
}

export { BanListDialog }