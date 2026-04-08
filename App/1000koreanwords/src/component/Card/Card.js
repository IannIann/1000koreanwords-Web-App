import CardQuestion from '@app/component/Card/CardQuestion';
import CardAnswer from '@app/component/Card/CardAnswer';
import ButtonCross from '@app/component/Buttons/ButtonCross';
import ButtonFavorite from '@app/component/Buttons/ButtonFavorite';
import ButtonPronunciation from '@app/component/Buttons/ButtonPronunciation';
import ButtonHide from '@app/component/Buttons/ButtonHide';
import { Component } from 'react';
import '@app/style/card.css';

class Card extends Component {

    state = { card: null };
    previousCard = { question: '', answer: '' };

    componentDidMount() {
        this.setState({ card: this.props.card });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.card !== this.props.card) {
            this.setState({ card: this.props.card });
        }
    }

    setQuestion = (value) => {
        this.setState({ card: { ...this.state.card, question: value } });
    }

    setAnswer = (value) => {
        this.setState({ card: { ...this.state.card, answer: value } });
    }

    handleFocus = () => {
        this.previousCard.question = this.state.card.question;
        this.previousCard.answer = this.state.card.answer;
    }

    handleBlur = () => {
        const { card } = this.state;
        if (card.question !== this.previousCard.question ||
            card.answer !== this.previousCard.answer) {
            this.props.saveCard(card);
        }
    }

    handleDeleteClick = () => {
        const { editable } = this.props;
        if (editable) {
            this.props.deleteCard(this.state.card);
        } else {
            this.props.restoreCard(this.state.card._id);
        }
    }

    onChangeQuestion = (e) => {
        this.setQuestion(e.target.value);
    }

    onChangeAnswer = (e) => {
        this.setAnswer(e.target.value);
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

        return (
            <div className="component-card">
                <ButtonCross handleClick={this.handleDeleteClick} />
                <CardQuestion
                    id={questionId}
                    value={card.question}
                    handleKeyPress={this.handleKeyPress}
                    onChangeQuestion={this.onChangeQuestion}
                    handleBlur={this.handleBlur}
                    handleFocus={this.handleFocus}
                    editable={true}
                />
                <CardAnswer
                    id={answerId}
                    value={card.answer}
                    handleKeyPress={this.handleKeyPress}
                    onChangeAnswer={this.onChangeAnswer}
                    handleBlur={this.handleBlur}
                    handleFocus={this.handleFocus}
                    editable={true}
                />
            </div>
        );
    }

    renderPlainCard = (card, isDeletable) => {
        const questionId = `${card._id}-question`;
        const answerId = `${card._id}-answer`;

        return (
            <div className="component-card">
                {isDeletable && <ButtonCross handleClick={this.handleDeleteClick} />}
                <CardQuestion id={questionId} value={card.question} editable={false} />
                <CardAnswer id={answerId} value={card.answer} editable={false} />
            </div>
        );
    }

    renderCardInPlay = (card) => {
        const {
            isAnswered,
            changeColor,
            color,
            openHideSingleCardModal,
            openFavoriteModal,
            displayButtons,
        } = this.props;

        let cardClassName = 'component-card flip-card';
        let shadowClassName = 'component-shadow'; // shadow must also flip to avoid z-index artefacts

        if (isAnswered) {
            cardClassName += ' flipped';
            shadowClassName += ' flipped';
        }
        if (changeColor) {
            cardClassName += ' ' + color;
            shadowClassName += ' ' + color;
        }

        return (
            <div className="card-wrapper">
                <div className={shadowClassName}></div>
                <div className={cardClassName}>
                    <div className="card-front">
                        <CardQuestion value={card.question} inPlay={true} />
                        <ButtonPronunciation handleClick={() => console.log("Speak")} />
                        <ButtonFavorite handleClick={openFavoriteModal} display={displayButtons} />
                        <ButtonHide handleClick={openHideSingleCardModal} display={displayButtons} />
                    </div>
                    <div className="card-back">
                        <CardQuestion value={card.question} inPlay={true} />
                        <CardAnswer value={card.answer} inPlay={true} />
                        <ButtonPronunciation handleClick={() => console.log("Speak")} />
                        <ButtonFavorite handleClick={openFavoriteModal} display={displayButtons} />
                        <ButtonHide handleClick={openHideSingleCardModal} display={displayButtons} />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { editable, inPlay, isDeletable } = this.props;
        const { card } = this.state;

        if (!card) return null;

        if (inPlay) return this.renderCardInPlay(card);
        if (editable) return this.renderEditableCard(card);
        return this.renderPlainCard(card, isDeletable);
    }
}

export default Card;
