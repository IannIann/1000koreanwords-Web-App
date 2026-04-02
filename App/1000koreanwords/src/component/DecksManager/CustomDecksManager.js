import React from 'react';
import { toast } from 'react-toastify';
import DecksList from '@app/component/DecksManager/DecksList';
import CustomDecksService from '@app/component/DecksManager/logic/CustomDecksService';
import ResetModal from '@app/component/Modals/ResetModal';
import HiddenCardsModal from '@app/component/Modals/HiddenCardsModal';
import DeleteModal from '@app/component/Modals/DeleteModal';
import { withRouter } from '@app/tool/withRouter';
import Loader from '@app/component/Main/Loader';


class CustomDecksManager extends React.Component {

    state = {
        decks: [],
        userDeckStates: {},
        enableHiddenCardsModal: false,
        enableResetModal: false,
        enableDeleteModal: false,
        maxCustomDecksLimit: 32,
        isLoading: true
    };

    componentDidMount() {
        this.fetchDecksList();
    }

    async fetchDecksList() {
        const [decks, userDeckStates, maxCustomDecksLimit] = await Promise.all([
            CustomDecksService.fetchDecks(),
            CustomDecksService.fetchUserDeckStates(),
            CustomDecksService.fetchMaxCustomDecksLimit(),
        ]);

        this.setState({ decks, userDeckStates, maxCustomDecksLimit, isLoading: false });
    };

    refreshDecks = () => {
        this.fetchDecksList();
    }

    openResetModal = (deckState) => {
        this.setState({
            resetModalClass: 'display',
            deckState,
            enableResetModal: true,
            enableHiddenCardsModal: false,
            enableDeleteModal: false
        });
        document.body.classList.add('modal-active');
    }

    openHiddenCardsModal = (deck, deckState) => {
        this.setState({
            hiddenCardsModalClass: 'display',
            deckState,
            deck,
            enableResetModal: false,
            enableHiddenCardsModal: true,
            enableDeleteModal: false
        });
        document.body.classList.add('modal-active');
    }

    openDeleteModal = (deck) => {
        this.setState({
            deleteModalClass: 'display',
            deck,
            enableResetModal: false,
            enableHiddenCardsModal: false,
            enableDeleteModal: true
        });
        document.body.classList.add('modal-active');
    }

    openEditPage = (deck) => {
        this.props.router.navigate(`/mydecks/edit/${deck.id}`);
    };

    closeModal = () => {
        this.setState({
            hiddenCardsModalClass: 'display out',
            resetModalClass: 'display out',
            deleteModalClass: 'display out'
        });

        document.body.classList.remove('modal-active');
    }

    renderElement() {
        const { decks,
            deck,
            userDeckStates,
            deckState,
            resetModalClass,
            enableResetModal,
            hiddenCardsModalClass,
            enableHiddenCardsModal,
            deleteModalClass,
            enableDeleteModal,
            maxCustomDecksLimit
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

                {enableDeleteModal &&
                    <DeleteModal modalClass={deleteModalClass}
                        deck={deck}
                        refreshDecks={this.refreshDecks}
                        onClose={this.closeModal} />
                }

                <div className="content">
                    {this.state.isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <div className="page-title">My decks</div>
                            <div className="page-subtitle">Create, edit and learn with you own decks</div>
                            <DecksList
                                decks={decks}
                                userDeckStates={userDeckStates}
                                maxCustomDecksLimit={maxCustomDecksLimit}
                                isCustomDeck={true}
                                refreshDecks={this.refreshDecks}
                                openResetModal={this.openResetModal}
                                openHiddenCardsModal={this.openHiddenCardsModal}
                                openEditPage={this.openEditPage}
                                openDeleteModal={this.openDeleteModal}
                                toast={toast}
                            />
                        </>
                    )}
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="component-custom-decks-manager fill-available-space">
                {this.renderElement()}
            </div>
        );
    }
}

export default withRouter(CustomDecksManager);