import React from "react";

export default class QuizzDisplayWord extends React.Component {

    render() {

        if (this.props.word === undefined)
        {
            return null;
        }

        if (this.props.isAnswered) {
            return (
                <div className="component-display-word">
                    <div>{this.props.word.question}</div>
                    <div>{this.props.word.answer}</div>
                </div>
            )
        } else {
            return (
                <div className="component-display-word">
                    <div>{this.props.word.question}</div>
                </div>
            )
        }
    }
}