import React from 'react';
import ButtonGhost from '@app/component/Buttons/ButtonGhost';

import '@app/style/quizzactions.css';

export default class QuizzActions extends React.Component {

    handleCommandClick = command => {
        this.props.commandHandler(command);
    };

    render() {
        const { isAnswered, isAnimating } = this.props;

        if (isAnswered) {
            return (
                <div className="component-quizz-actions">
                    <ButtonGhost
                        label="Correct"
                        color="black"
                        onClick={() => this.handleCommandClick('Correct')}
                        disabled={isAnimating}
                        position="top"
                    />
                    <ButtonGhost
                        label="Wrong"
                        color="black"
                        onClick={() => this.handleCommandClick('Wrong')}
                        disabled={isAnimating}
                        position="bottom"
                    />
                </div>
            );
        }

        return (
            <div className="component-quizz-actions">
                <ButtonGhost
                    label="Show answer"
                    color="black"
                    onClick={() => this.handleCommandClick('Show')}
                    position="default"
                />
            </div>
        );
    }
}