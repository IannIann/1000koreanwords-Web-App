import React from "react";
import Deck from "./Deck";

export default class Tree extends React.Component {

    componentDidUpdate(prevProps) {
       
        if (this.props.decks !== prevProps.decks) {
            const decksStates = this.props.userDeckStates.decks;

            const decks = this.props.decks.map(deck => ({
                id: deck._id,
                name: deck.name,
                size: deck.cards.length,
                deckState: decksStates.find(deckState => deckState.deckId == deck._id)
            }));

            this.setState({ decks: decks });
        }

    }

    state = {
        decks: []
    };

    renderElement() {
        return (
            this.state.decks.map((deck, key) => {
                return (
                    <Deck key={key} deck={deck} />
                )
            })
        )
    }

    render() {
        return (
            <div className="component-tree">
                {this.renderElement()}
            </div>
        )
    }
}