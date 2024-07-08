import React from "react";
import Deck from "./Deck";

export default class Tree extends React.Component {
    
    state = {
        decks: []
    };

    // Update decks state when props change, and create new decks state array
    // with updated data from props decks and userDeckStates
    componentDidUpdate(prevProps) {
        const { decks, userDeckStates } = this.props;
        if (decks !== prevProps.decks && decks) {
            const deckStates = userDeckStates.decks;

            const updatedDecks = decks.map(deck => ({
                id: deck._id,
                name: deck.name,
                size: deck.cards.length,
                isCustom: deck.isCustom || false,
                deckState: deckStates.find(ds => ds.deckId === deck._id)
            }));

            this.setState({ decks: updatedDecks });
        }
    }

    renderElement() {
        return (
            this.state.decks.map((deck, index) => (
                <Deck key={index} deck={deck} refreshDecks={this.props.refreshDecks} />
            ))
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