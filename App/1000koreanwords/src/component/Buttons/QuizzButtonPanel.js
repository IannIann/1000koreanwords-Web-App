import ButtonGhost from "@app/component/Buttons/ButtonGhost";
import React from "react";


import '@app/style/quizzbuttonpanel.css';

export default class QuizzButtonPanel extends React.Component {

    handleCommandClick = command => {
        this.props.commandHandler(command);
    };

    render() {
        const {isAnswered, isAnimating} = this.props;

        if (isAnswered) {
            return (
                <div className="component-quizz-button-panel">
                    <ButtonGhost
                        label="Correct"
                        color="green"
                        onClick={() => this.handleCommandClick("Correct")}
                        disabled={isAnimating}
                    />
                    <ButtonGhost
                        label="Wrong"
                        color="red"
                        onClick={() => this.handleCommandClick("Wrong")}
                        disabled={isAnimating}
                    />
                </div>
            );
        } else {
            return (
                <div className="component-quizz-button-panel">
                    <ButtonGhost
                        label="Show answer"
                        color="blue"
                        onClick={() => this.handleCommandClick("Show")}
                    />
                </div>
            );
        }
    }
}