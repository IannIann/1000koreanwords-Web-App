import React from "react";
import Card from "@app/component/Card/Card";
import QuizzProgress from "@app/component/Quizz/QuizzProgress";
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import '@app/style/quizzresult.css';

export default class QuizzResult extends React.Component {

    renderCards = (cards, type) => {
        return (
            <>
                <div className="result-section-header">{cards.length > 1 ? `${type} answers` : `${type} answer`}</div>
                <div className={`${type.toLowerCase()}-cards `}>
                    <div className='quizz-result-grid'>
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
                </div>
            </>
        );
    };


    renderElement() {

        const { correctCards, wrongCards, restartQuizz, navigateToLearnPage, isDeckFullyCompleted } = this.props;

        let restartBtnDisabled = isDeckFullyCompleted;
        let restartBtnColor = isDeckFullyCompleted ? "gray" : "";

        return (
            <>
                <div className="quizz-result-header">
                    <ButtonFlat label="Back" customClass="button-result-back" onClick={navigateToLearnPage}/>
                    <div className="quizz-result-score">
                        <div className="quizz-result-score-text">
                            {`You had ${correctCards.length === 1 ? '1 correct answer' : `${correctCards.length} correct answers`} 
                                    out of ${correctCards.length + wrongCards.length === 1 ? '1 card' : `${correctCards.length + wrongCards.length} cards`}.`}
                        </div>
                        <QuizzProgress scoreIndex={correctCards.length} maxIndex={correctCards.length + wrongCards.length} label="SCORE"/>
                    </div>
                    <ButtonFlat label="Restart" customClass={`button-result-restart ${restartBtnColor}`}  disabled={restartBtnDisabled} onClick={restartQuizz}/>
                </div>

                {wrongCards.length > 0 && this.renderCards(wrongCards, "Wrong")}
                {correctCards.length > 0 && this.renderCards(correctCards, "Correct")}
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
