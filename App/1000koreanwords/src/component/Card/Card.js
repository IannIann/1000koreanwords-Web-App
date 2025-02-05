import React from 'react';
import CardQuestion from '@app/component/Card/CardQuestion';
import CardAnswer from '@app/component/Card/CardAnswer';
import CrossButton from '@app/component/Buttons/CrossButton';
import FavoriteButton from '@app/component/Buttons/FavoriteButton';
import HideButton from '@app/component/Buttons/HideButton';
import '@app/style/card.css'

class Card extends React.Component {

    state = { card: null };
    previousCard = { question: "", answer: "" };

    componentDidUpdate(prevProps) {
        if (prevProps.card !== this.props.card) {
            this.setState({ card: this.props.card });
        }
    }

    componentDidMount() {
        this.setState({ card: this.props.card });
    }

    setQuestion = (value) => {
        const card = this.state.card;
        card.question = value;
        this.setState({ card: card });
    }

    setAnswer = (value) => {
        const card = this.state.card;
        card.answer = value;
        this.setState({ card: card });
    }

    handleBlur = () => {
        const { card } = this.state;

        if (card.question !== this.previousCard.question ||
            card.answer !== this.previousCard.answer) {
            this.props.saveCard(card);
        }
    }

    handleFocus = () => {
        this.previousCard.question = this.state.card.question
        this.previousCard.answer = this.state.card.answer
    }

    handleDeleteClick = () => {
        const {editable} = this.props;

        if(editable) {
            this.props.deleteCard(this.state.card);
        } else 
        {
            this.props.restoreCard(this.state.card._id);
        }
    }

    onChangeAnswer = (e) => {
        this.setAnswer((e.target.value));
    };

    onChangeQuestion = (e) => {
        this.setQuestion(e.target.value);
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    }

    renderEditableCard = (card) => {
        const questionId = `${card._id}-question`;
        const answerId = `${card._id}-answer`;
        const editable = true;

        return (
            <div className="component-card" >
                <CrossButton handleClick={this.handleDeleteClick} />
                <CardQuestion 
                    id={questionId}
                    value={card.question}
                    handleKeyPress={this.handleKeyPress}
                    onChangeQuestion={this.onChangeQuestion}
                    handleBlur={this.handleBlur}
                    handleFocus={this.handleFocus}
                    editable={editable}
                />
                <CardAnswer
                    id={answerId}
                    value={card.answer}
                    handleKeyPress={this.handleKeyPress}
                    onChangeAnswer={this.onChangeAnswer}
                    handleBlur={this.handleBlur}
                    handleFocus={this.handleFocus}
                    editable={editable}
                />
            </div>
        )
    }

    renderPlainCard = (card, isDeletable) => {
        const questionId = `${card._id}-question`;
        const answerId = `${card._id}-answer`;
        const editable = false;

        return (
            <div className="component-card">
                {isDeletable &&
                    <CrossButton handleClick={this.handleDeleteClick} />
                }
                
                <CardQuestion 
                    id={questionId}
                    value={card.question}
                    editable={editable}
                />
                <CardAnswer
                    id={answerId}
                    value={card.answer} 
                    editable={editable}
                />
            </div>
        )
    }

    renderCardInPlay = (card) => {
        const { isAnswered, 
            openHideSingleCardModal, 
            openFavoriteModal
        } = this.props;

        let cardClassName = "component-card flip-card";
        let shadowClassName = "component-shadow"; //has to trick the shadow box so it can be flipped
        if (isAnswered) {
            cardClassName += " flipped";
            shadowClassName += " flipped";
        }

        return (
            <div className="component-wrapper">
            <div className={shadowClassName}></div>
                <div className={cardClassName}>
                    <div className="card-front">
                        <CardQuestion value={card.question} inPlay={true} />
                        <FavoriteButton handleClick={openFavoriteModal} />
                        <HideButton handleClick={openHideSingleCardModal} />
                    </div>
                    <div className="card-back">
                        <CardQuestion value={card.question} inPlay={true} />
                        <CardAnswer value={card.answer} inPlay={true} />
                        <FavoriteButton handleClick={openFavoriteModal} />
                        <HideButton handleClick={openHideSingleCardModal} />
                    </div>
                </div>
            </div>
        )
    }

    renderCard = (card, editable, inPlay, isDeletable) => {
        if (inPlay) {
            return this.renderCardInPlay(card);
        }
        if (editable) {
            return this.renderEditableCard(card);
        } else {
            return this.renderPlainCard(card, isDeletable);
        }
    }

    render() {
        const { editable, inPlay, isDeletable } = this.props;
        const { card } = this.state;

        if (!card) {
            return null;
        }

        return (
            <>
                {this.renderCard(card, editable, inPlay, isDeletable)}
            </>
        );
    }
}

export default Card;