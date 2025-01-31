import CommandButton from "./CommandButton";
import React from "react";

export default class ButtonPanel extends React.Component {

    handleCommandClick = command => {
        this.props.commandHandler(command);
    };

    render() {

        if (this.props.isAnswered) {
            return (
                <div className="component-button-panel">
                        <CommandButton name="Correct" command="Correct" clickHandler={this.handleCommandClick} />
                        <CommandButton name="Wrong" command="Wrong" clickHandler={this.handleCommandClick} />
                        <CommandButton name="Ban" command="Ban" clickHandler={this.handleCommandClick} />
                </div>
            );
        } else {
            return (
                <div className="component-button-panel">
                        <CommandButton name="Show" command="Show" clickHandler={this.handleCommandClick} />
                </div>
            );
        }
    }
}