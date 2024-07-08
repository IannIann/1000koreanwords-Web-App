import React from 'react';
import ButtonAddDeck from "./ButtonAddDeck"
import Tree from '@app/component/DecksTree/Tree'
import DecksTree from './logic/CustomDecksTree';
import { ResetDialog } from '@app/component/QuizzOptionMenu/ResetDialog'

export default class CustomDecksTreeApp extends React.Component {

    state = {
        decks: [],
        userDeckStates: {}
    };

    componentDidMount() {
        this.fetchDecksTree();
    }

    async fetchDecksTree() {
        const [decks, userDeckStates] = await Promise.all([
            DecksTree.fetchDecks(),
            DecksTree.fetchUserDeckStates(),
        ]);

        this.setState({ decks, userDeckStates });
    };

    refreshDecks = () => {
        this.fetchDecksTree()
    }

    renderElement() {
        const { decks, userDeckStates } = this.state;
        const maximumDeck = 10;
        return (
            <>
                <Tree
                    decks={decks}
                    userDeckStates={userDeckStates}
                    refreshDecks={this.refreshDecks}
                />
                <ResetDialog />
                {decks.length < maximumDeck && (
                    <ButtonAddDeck
                        refreshDecks={this.refreshDecks}
                        decks={decks}
                    />
                )}
            </>
        )
    }

    render() {
        return (
            <div className="component-custom-decks-tree-app">
                {this.renderElement()}
            </div>
        )
    }
}