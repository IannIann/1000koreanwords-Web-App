import React from "react";
import AuthService from '@app/service/auth.service'
import userdeckstatesData from '@app/data/userdeckstates.data';
import decksData from '@app/data/decks.data';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class BanListDialog extends React.Component {

    state = {
        isVisible: false,
        bannedCards: []
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isVisible != this.props.isVisible) {
            this.setState({ isVisible: this.props.isVisible })

            //If dialog is displayed load cards data and compute banned cards
            if (this.props.isVisible && this.props.deck.deckState) 
            {
                decksData.getDeckById(this.props.deck.id)
                    .then((res) => {
                        let cardList = res.result[0].cards;
                        let bannedCardsId = this.props.deck.deckState.bannedCards
                        let bannedCards = cardList.filter(card => bannedCardsId.includes(card._id))

                        this.setState({ bannedCards: bannedCards })
                    })

            }
        }
    }

    removeCardFromBanList = CardIdToRestore => {
        let updatedList = this.state.bannedCards.filter(card => card._id != CardIdToRestore)
        this.setState({ bannedCards: updatedList })
    }

    onClickRestore = id => {
        this.removeCardFromBanList(id);
    }

    onConfirm = () => {
        let userId = AuthService.getCurrentUser().id
        let updatedDeckState = {...this.props.deck.deckState};
        updatedDeckState.bannedCards = this.state.bannedCards;
        userdeckstatesData.updateDeckState(userId, updatedDeckState)
        this.props.updateDeckStateDisplay(updatedDeckState);
        this.closeDialog();
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

    renderEmptyList()
    {
        return <p> List of removed cards is empty. </p>
    }

    renderBanList() {
        if (!this.props.deck.deckState)
            return this.renderEmptyList()

         if(this.state.bannedCards.length == 0)
            return this.renderEmptyList()

        return (
            this.state.bannedCards.map((card, key) => {
                return (
                    <div key={key}>{card.word} {card.wordTranslated.eng}
                        <button onClick={() => this.onClickRestore(card._id)}> Restore </button>
                    </div>
                )
            })
        )
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