import React from "react";
import Deck from "./Deck";

export default class Tree extends React.Component {

    renderElement() {
        return (
            this.props.decks.map((deck, key) => {
                return <Deck key={key} id={deck._id} name={deck.name} />
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