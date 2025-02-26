import React from "react";
import Card from "@app/component/Card/Card";
import '@app/style/quizzresult.css';

export default class QuizzResult extends React.Component {
    render() {
        const { correctCards, wrongCards } = this.props;

        const renderCards = (cards, type) => {
            return (
                <>
                    <h3>{cards.length > 1 ? `${type} answers` : `${type} answer`}</h3>
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

        return (
            <div className="component-quizz-result">
                {correctCards.length > 0 && renderCards(correctCards, "Correct")}
                {wrongCards.length > 0 && renderCards(wrongCards, "Wrong")}
            </div>
        );
    }
}
