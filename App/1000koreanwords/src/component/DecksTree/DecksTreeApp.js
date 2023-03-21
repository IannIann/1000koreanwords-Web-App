import React from 'react';
import Tree from './Tree'
import ButtonGradePanel from './ButtonGradePanel'
import DecksTree from './logic/DecksTree';
import {ResetDialog} from '@app/component/QuizzOptionMenu/ResetDialog'
import { BanListDialog } from '@app/component/QuizzOptionMenu/BanListDialog';

export default class DecksTreeApp extends React.Component {
    state = {
        decks: [],
        userDeckStates : {}
    };

    componentDidMount() {
        this.instantiateDecksTree(this.getDefaultGrade());
    }

    handleClick = grade => {
        this.instantiateDecksTree(grade);
        localStorage.setItem("grade", grade);
    };

    getDefaultGrade = () => {
        const currentGrade = localStorage.getItem("grade");

        if(!currentGrade)
        {
            return "Beginner"
        } 

        return currentGrade;
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
                <ButtonGradePanel clickHandler={this.handleClick} />
                <Tree decks={this.state.decks} userDeckStates={this.state.userDeckStates}/>
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