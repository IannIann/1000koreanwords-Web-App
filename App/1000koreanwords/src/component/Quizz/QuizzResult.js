import React from "react";
import Card from "@app/component/Card/Card";
import QuizzProgressBar from "@app/component/Quizz/QuizzProgressBar";
import ButtonPushable from '@app/component/Buttons/ButtonPushable';
import '@app/style/quizzresult.css';

export default class QuizzResult extends React.Component {

    renderCards = (cards, type) => {
        return (
            <>
                <div className="result-section-header">{cards.length > 1 ? `${type} answers` : `${type} answer`}</div>
                <div className={`${type.toLowerCase()}-cards`}>
                    {cards.map((card, index) => (
                        <Card
                            card={card}
                            key={index}
                            inPlay={false}
                            editable={false}
                            isDeletable={false}
                        />
                    ))}
                </div>
            </>
        );
    };


    renderElement() {

        const { correctCards, wrongCards, restartQuizz, navigateToLearnPage, isDeckFullyCompleted } = this.props;

        let restartBtnColor = isDeckFullyCompleted ? "gray" : "green";

        return (
            <>
                <div className="quizz-result-header">
                    <ButtonPushable size="small" label="↤ Back" color="blue" onClick={navigateToLearnPage} />
                    <div className="quizz-result-score">
                        <div>
                            {`You had ${correctCards.length === 1 ? '1 correct answer' : `${correctCards.length} correct answers`} 
                                    out of ${correctCards.length + wrongCards.length === 1 ? '1 card' : `${correctCards.length + wrongCards.length} cards`}.`}
                        </div>
                        <QuizzProgressBar scoreIndex={correctCards.length} maxIndex={correctCards.length + wrongCards.length} />
                    </div>
                    <ButtonPushable size="small" label="Restart ⭯" color={restartBtnColor} onClick={restartQuizz} />
                </div>

                {correctCards.length > 0 && this.renderCards(correctCards, "Correct")}
                {wrongCards.length > 0 && this.renderCards(wrongCards, "Wrong")}
            </>
        );

    }
    render() {

        return (
            <div className="component-quizz-result">
                {this.renderElement()}
            </div>
        )

    }
}
