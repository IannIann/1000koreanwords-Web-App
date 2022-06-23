import React from 'react';
import Tree from './Tree'
import ButtonGradePanel from './ButtonGradePanel'
import DecksTree from './logic/DecksTree';

export default class DecksTreeApp extends React.Component {

    componentDidMount() {
        DecksTree.instantiateDecksTree()
            .then((res) => { this.setState(res) });
    }

    state = {
        decks: []
    };

    handleClick = grade => {
        DecksTree.instantiateDecksTree(grade)
            .then((res) => { this.setState(res) });
    };

    renderElement() {
        return (
            <>
                <ButtonGradePanel clickHandler={this.handleClick} />
                <Tree decks={this.state.decks} />
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