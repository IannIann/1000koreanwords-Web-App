import CommandButton from "./CommandButton";
import React from "react";

export default class ButtonPanel extends React.Component {

    handleClick = command => {
        this.props.clickHandler(command);
    };

    render() {

        if (this.props.isAnswered) {
            return (
                <div className="component-button-panel">
                        <CommandButton name="Correct" command="Correct" clickHandler={this.handleClick} />
                        <CommandButton name="Wrong" command="Wrong" clickHandler={this.handleClick} />
                        <CommandButton name="Ban" command="Ban" clickHandler={this.handleClick} />
                </div>
            );
        } else {
            return (
                <div className="component-button-panel">
                        <CommandButton name="Show" command="Show" clickHandler={this.handleClick} />
                </div>
            );
        }
    }
}