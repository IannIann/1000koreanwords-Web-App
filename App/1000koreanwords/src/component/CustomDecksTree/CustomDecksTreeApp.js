import React from 'react';
import Tree from './Tree'
import DecksTree from './logic/CustomDecksTree';
import {ResetDialog} from '@app/component/QuizzOptionMenu/ResetDialog'

export default class CustomDecksTreeApp extends React.Component {
    state = {
        decks: [],
        userDeckStates : {}
    };

    componentDidMount() {
        //this.instantiateDecksTree(this.getDefaultGrade());
    }

    instantiateDecksTree(grade)
    {
        Promise.all([DecksTree.instantiateDecks(grade),
            DecksTree.instantiateUserDeckStates()])
                .then((res) => {
                    this.setState({
                        decks: res[0],
                        userDeckStates: res[1],
                    });
                });
    }

    renderElement() {
        return (
            <>
                <Tree decks={this.state.decks} userDeckStates={this.state.userDeckStates}/>
                <ResetDialog />
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