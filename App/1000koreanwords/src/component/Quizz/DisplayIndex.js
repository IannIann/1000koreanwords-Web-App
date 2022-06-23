import React from "react";

export default class DisplayIndex extends React.Component {

    render() {
        return (
            <div className="component-display-index">
                <div>{this.props.currentIndex} / {this.props.maxIndex}</div>
            </div>
        )
    }
}