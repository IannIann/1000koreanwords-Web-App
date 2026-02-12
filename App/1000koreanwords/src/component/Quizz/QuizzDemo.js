import React from "react";
import Quizz from "./logic/Quizz.js";
import Card from "@app/component/Card/Card";
import QuizzButtonPanel from "@app/component/Buttons/QuizzButtonPanel.js";
import "@app/style/quizzapp.css";

const cards = [
    {
        question: "안녕하세요",
        answer: "Hello (formal)",
    },
    {
        question: "감사합니다",
        answer: "Thank you (formal)",
    },
    {
        question: "네",
        answer: "Yes",
    },
    {
        question: "아니요",
        answer: "No",
    },
    {
        question: "물",
        answer: "Water",
    },
    {
        question: "밥",
        answer: "Cooked rice / meal",
    },
    {
        question: "친구",
        answer: "Friend",
    },
    {
        question: "학교",
        answer: "School",
    },
    {
        question: "시간",
        answer: "Time",
    },
    {
        question: "어디",
        answer: "Where",
    }
];


export default class QuizzDemo extends React.Component {
    state = {
        card: {},
        isAnswered: false,
        isAnimating: false,

        cardIndex: 0,
        maxIndex: 0,

        changeColor: false,
        color: "",

        fade: false,
        fadeClass: "",
    };


    componentDidMount() {
        let card = cards[0];
        let cardIndex = 0;
        let maxIndex = cards.length;
        this.setState({card, cardIndex, maxIndex, isAnswered: false});
    }

    incrementCardIndex = () => 
    {
        let cardIndex = this.state.cardIndex + 1;
        if (cardIndex >= this.state.maxIndex) {
            cardIndex = 0;
        }
        const card = cards[cardIndex];
        this.setState({ card, cardIndex, isAnswered: false });
    }

    playColorAnimation = (command) => {
        const colors = {
            Correct: "green",
            Wrong: "red",
            Hide: "colorless"
        };

        this.setState({ isAnimating: true, changeColor: true, color: colors[command] });

        setTimeout(() => this.setState({ changeColor: false, color: "" }), 600);
    };

    playFadeAnimation = () => {
        this.setState({ fade: true, fadeClass: "fade-out" });

        setTimeout(() => this.setState({ isAnimating: false, fade: false, fadeClass: "" }), 300);
    };

    handleCommandClick = (command) => {
        if (command === "Correct" || command === "Wrong" || command === "Hide") {
            //increment score for progress bar
            this.setState({ scoreIndex: this.state.scoreIndex + 1 });

            //We play a short animation if the command is Correct or Wrong before updating the quizz
            this.playColorAnimation(command, 300);
            setTimeout(() => this.playFadeAnimation(), 600);
            setTimeout(() => this.setState(this.incrementCardIndex()), 900);
        } else {
            //If the command is Show, update the quizz
            this.setState({ isAnswered: true });
        }
    };



    renderCardQuizz() {
        const {
            isAnswered,
            card,
            changeColor,
            color,
            fade,
            fadeClass,
            isAnimating,
        } = this.state;

        return (
            <>
                <Card card={card}
                    inPlay={true}
                    isAnswered={isAnswered}
                    changeColor={changeColor}
                    color={color}
                    fade={fade}
                    fadeClass={fadeClass}
                    displayButtons={false}
                />

                <QuizzButtonPanel isAnswered={isAnswered} isAnimating={isAnimating} commandHandler={this.handleCommandClick} />
            </>
        );
    }

    renderElement() {
        return (
            <>
                <div className="content">
                    { this.renderCardQuizz()}
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="component-quizz-app">
                {this.renderElement()}
            </div>
        )
    }
}

