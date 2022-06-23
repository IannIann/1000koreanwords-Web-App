import React from "react";

export default class DisplayScore extends React.Component {

    render() {
        return (
            <div className="component-display-score">
                <div>Score : {this.props.score} / {this.props.maxScore}</div>
            </div>
        )
    }
}