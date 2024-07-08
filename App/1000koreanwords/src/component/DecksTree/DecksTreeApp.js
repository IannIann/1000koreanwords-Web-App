import React from 'react';
import Tree from './Tree'
import ButtonGradePanel from './ButtonGradePanel'
import DecksTree from './logic/DecksTree';
import { ResetDialog } from '@app/component/QuizzOptionMenu/ResetDialog'
import { BanListDialog } from '@app/component/QuizzOptionMenu/BanListDialog';

export default class DecksTreeApp extends React.Component {
    state = {
        decks: [],
        userDeckStates: {}
    };

    componentDidMount() {
        const defaultGrade = this.getDefaultGrade();
        this.fetchDecksTree(defaultGrade);
    }

    handleClick = grade => {
        this.fetchDecksTree(grade);
        localStorage.setItem("grade", grade);
    };

    getDefaultGrade = () => {
        const currentGrade = localStorage.getItem("grade");

        if (!currentGrade) {
            return "Beginner"
        }

        return currentGrade;
    }

    async fetchDecksTree(grade) {
        const [decks, userDeckStates] = await Promise.all([
            DecksTree.fetchDecks(grade),
            DecksTree.fetchUserDeckStates(),
        ]);

        this.setState({ decks, userDeckStates });
    }

    refreshDecks = () => {
        this.fetchDecksTree(this.getDefaultGrade())
    }

    renderElement() {
        const { decks, userDeckStates } = this.state;
        return (
            <>
                <ButtonGradePanel clickHandler={this.handleClick} />
                <Tree decks={decks}
                    userDeckStates={userDeckStates}
                    refreshDecks={this.refreshDecks} />
                <ResetDialog />
            </>
        )
    }

    render() {
        return (
            <div className="component-decks-tree-app">
                {this.renderElement()}
            </div>
        )
    }
}