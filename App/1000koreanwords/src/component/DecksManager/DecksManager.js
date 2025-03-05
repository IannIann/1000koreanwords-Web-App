import React from 'react';
import DecksList from '@app/component/DecksManager/DecksList'
import DecksService from '@app/component/DecksManager/logic/DecksService';
import ResetModal from '@app/component/Modals/ResetModal';
import HiddenCardsModal from '@app/component/Modals/HiddenCardsModal';

export default class DecksManager extends React.Component {
    state = {
        decks: [],
        userDeckStates: {},
        enableHiddenCardsModal: false,
        enableResetModal: false,
    };

    componentDidMount() {
        this.fetchDecksList();
    }

    async fetchDecksList() {
        const [decks, userDeckStates] = await Promise.all([
            DecksService.fetchDecks(),
            DecksService.fetchUserDeckStates(),
        ]);

        this.setState({ decks, userDeckStates });
    }

    refreshDecks = () => {
        this.fetchDecksList()
    }

    openResetModal = (deckState) => {
        this.setState({
            resetModalClass: 'display',
            deckState,
            enableHiddenCardsModal: false,
            enableResetModal: true
        });
        document.body.classList.add('modal-active');
    }

    openHiddenCardsModal = (deck, deckState) => {
        this.setState({ 
            hiddenCardsModalClass: 'display', 
            deckState, 
            deck,
            enableResetModal: false,
            enableHiddenCardsModal: true 
        });
        document.body.classList.add('modal-active');
    }

    closeModal = () => {
        this.setState({
            hiddenCardsModalClass: 'display out',
            resetModalClass: 'display out'
        });
        
        document.body.classList.remove('modal-active');
    }

    renderElement() {
        const { decks, 
            deck,
            userDeckStates, 
            deckState, 
            resetModalClass, 
            hiddenCardsModalClass,
            enableHiddenCardsModal,
            enableResetModal 
        } = this.state;

        return (
            <>
                {enableResetModal &&
                    <ResetModal modalClass={resetModalClass}
                        deckState={deckState}
                        refreshDecks={this.refreshDecks}
                        onClose={this.closeModal} />
                }

                {enableHiddenCardsModal &&
                    <HiddenCardsModal modalClass={hiddenCardsModalClass}
                        deckState={deckState}
                        deck={deck}
                        refreshDecks={this.refreshDecks}
                        onClose={this.closeModal} />
                }

                <div className="content">
                    <DecksList decks={decks}
                        userDeckStates={userDeckStates}
                        refreshDecks={this.refreshDecks}
                        openResetModal={this.openResetModal}
                        openHiddenCardsModal={this.openHiddenCardsModal} />
                </div>
            </>
        )
    }

    render() {
        return (
            <>
                {this.renderElement()}
            </>
        )
    }
}