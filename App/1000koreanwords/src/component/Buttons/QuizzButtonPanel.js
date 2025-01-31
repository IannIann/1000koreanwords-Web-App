import ButtonPushable from "@app/component/Buttons/ButtonPushable";
import React from "react";


import '@app/style/quizzbuttonpanel.css';

export default class QuizzButtonPanel extends React.Component {

    handleCommandClick = command => {
        this.props.commandHandler(command);
    };

    render() {

        if (this.props.isAnswered) {
            return (
                <div className="component-quizz-button-panel">
                    <ButtonPushable label="Correct" color="green" size="big" onClick={() => this.handleCommandClick("Correct")} />
                    <ButtonPushable label="Wrong" color="red" size="big" onClick={() => this.handleCommandClick("Wrong")} />
                </div>
            );
        } else {
            return (
                <div className="component-quizz-button-panel">
                    <ButtonPushable label="Show answer" color="blue" size="big" onClick={() => this.handleCommandClick("Show")} />
                </div>
            );
        }
    }
}