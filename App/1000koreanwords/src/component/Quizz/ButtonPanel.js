import Button from "./Button";
import React from "react";

export default class ButtonPanel extends React.Component {

    handleClick = buttonName => {
        this.props.clickHandler(buttonName);
    };

    render() {

        if (this.props.isAnswered) {
            return (
                <div className="component-button-panel">
                        <Button name="Correct" clickHandler={this.handleClick} />
                        <Button name="Wrong" clickHandler={this.handleClick} />
                        <Button name="Ban" clickHandler={this.handleClick} />
                </div>
            );
        } else {
            return (
                <div className="component-button-panel">
                        <Button name="Show" clickHandler={this.handleClick} />
                </div>
            );
        }
    }
}