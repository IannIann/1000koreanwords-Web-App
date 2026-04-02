import React from 'react';
import Card from '@app/component/Card/Card';
import QuizzActions from '@app/component/Quizz/QuizzActions.js';
import '@app/style/quizzapp.css';

const DEMO_CARDS = [
    { question: '안녕하세요', answer: 'Hello (formal)' },
    { question: '감사합니다', answer: 'Thank you (formal)' },
    { question: '네', answer: 'Yes' },
    { question: '아니요', answer: 'No' },
    { question: '물', answer: 'Water' },
    { question: '밥', answer: 'Cooked rice / meal' },
    { question: '친구', answer: 'Friend' },
    { question: '학교', answer: 'School' },
    { question: '시간', answer: 'Time' },
    { question: '어디', answer: 'Where' },
];

const COLOR_MAP = {
    Correct: 'green',
    Wrong: 'red',
    Hide: 'colorless',
};

export default class QuizzDemo extends React.Component {
    state = {
        card: {},
        isAnswered: false,
        isAnimating: false,
        cardIndex: 0,
        maxIndex: 0,
        changeColor: false,
        color: '',
        fadeClass: '',
    };

    componentDidMount() {
        this.setState({
            card: DEMO_CARDS[0],
            cardIndex: 0,
            maxIndex: DEMO_CARDS.length,
            isAnswered: false,
        });
    }

    incrementCardIndex = () => {
        const nextIndex = (this.state.cardIndex + 1) % this.state.maxIndex;
        this.setState({ card: DEMO_CARDS[nextIndex], cardIndex: nextIndex, isAnswered: false });
    };

    playColorAnimation = (command) => {
        this.setState({ isAnimating: true, changeColor: true, color: COLOR_MAP[command] });
        setTimeout(() => this.setState({ changeColor: false, color: '' }), 600);
    };

    playFadeAnimation = () => {
        this.setState({ fadeClass: 'fade-out' });
        setTimeout(() => this.setState({ isAnimating: false, fadeClass: '' }), 300);
    };

    handleCommandClick = (command) => {
        if (command === 'Correct' || command === 'Wrong' || command === 'Hide') {
            this.playColorAnimation(command);
            setTimeout(() => this.playFadeAnimation(), 600);
            setTimeout(() => this.incrementCardIndex(), 900);
        } else {
            this.setState({ isAnswered: true });
        }
    };

    renderCardQuizz() {
        const { isAnswered, card, changeColor, color, fadeClass, isAnimating } = this.state;

        return (
            <div className={`quizz-wrapper ${fadeClass}`}>
                <Card
                    card={card}
                    inPlay={true}
                    isAnswered={isAnswered}
                    changeColor={changeColor}
                    color={color}
                    displayButtons={false}
                />
                <QuizzActions
                    isAnswered={isAnswered}
                    isAnimating={isAnimating}
                    commandHandler={this.handleCommandClick}
                />
            </div>
        );
    }

    render() {
        return (
            <div className="component-quizz-demo">
                {this.renderCardQuizz()}
            </div>
        );
    }
}
