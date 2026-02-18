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
        const id = Math.random().toString(36).substring(2, 10);
        const questionId = `${id}-question`;
        const answerId = `${id}-answer`;
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
        const id = Math.random().toString(36).substring(2, 10);
        const questionId = `${id}-question`;
        const answerId = `${id}-answer`;
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
            changeColor,
            color,
            openHideSingleCardModal, 
            openFavoriteModal,
            displayButtons
        } = this.props;

        let cardClassName = "component-card flip-card";
        let shadowClassName = "component-shadow"; //has to trick the shadow box so it can be flipped
        let wrapperClassName = "card-wrapper";

        if (isAnswered) {
            cardClassName += " flipped";
            shadowClassName += " flipped";
        }
        if (changeColor) {
            cardClassName += " " + color;
            shadowClassName += " " + color;
        }

        return (
            <div className="card-wrapper" >
            <div className={shadowClassName}></div>
                <div className={cardClassName}>
                    <div className="card-front">
                        <CardQuestion value={card.question} inPlay={true} />
                        <FavoriteButton handleClick={openFavoriteModal} displayButtons={displayButtons} />
                        <HideButton handleClick={openHideSingleCardModal} displayButtons={displayButtons}  />
                    </div>
                    <div className="card-back">
                        <CardQuestion value={card.question} inPlay={true} />
                        <CardAnswer value={card.answer} inPlay={true} />
                        <FavoriteButton handleClick={openFavoriteModal} displayButtons={displayButtons} />
                        <HideButton handleClick={openHideSingleCardModal} displayButtons={displayButtons} />
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
        const { editable, inPlay, isDeletable, displayButtons } = this.props;
        const { card } = this.state;

        if (!card) {
            return null;
        }

        return (
            <>
                {this.renderCard(card, editable, inPlay, isDeletable, displayButtons)}
            </>
        );
    }
}


export default Card;