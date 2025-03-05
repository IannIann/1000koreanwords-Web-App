import React from "react";
import Quizz from "./logic/Quizz.js";
import DisplayIndex from "./DisplayIndex";
import DisplayWord from "./DisplayWord";
import DisplayScore from "./DisplayScore";
import ButtonPanel from "./ButtonPanel";
import CommandButton from "./CommandButton.js";
import TextToSpeech from "./TextToSpeech";
import CardsOptionsMenu from "../QuizzOptionMenu/CardsOptionsMenu";
import { BanCardDialog } from "../QuizzOptionMenu/BanCardDialog.js";
import Card from "@app/component/Card/Card";
import { withRouter } from '@app/tool/withRouter'
import QuizzProgressBar from "@app/component/Quizz/QuizzProgressBar";
import QuizzButtonPanel from "@app/component/Buttons/QuizzButtonPanel.js";
import QuizzResult from "@app/component/Quizz/QuizzResult.js";
import QuizzTheme from "@app/component/Quizz/QuizzTheme.js";

import HideSingleCardModal from '@app/component/Modals/HideSingleCardModal';
import FavoriteModal from '@app/component/Modals/FavoriteModal';

import "@app/style/quizzapp.css";

class QuizzApp extends React.Component {

    state = {
        card: {},
        score : {},
        theme: "",
        isAnswered: false,
        isFinished: false,
        isAnimating : false,

        cardIndex: 0,
        maxIndex: 0,

        changeColor : false,
        color : "",

        fade : false,
        fadeClass : "",

        enableFavoriteModal: true,
        enableHideSingleCardModal: true
    };

    componentDidMount() {
        const { deckId } = this.props.router.params;
        const isCustomDeck = this.isCustomDeck()

        Quizz.instantiateQuizzDeck(deckId, isCustomDeck)
            .then(({ maxIndex, card, theme }) => {
                this.setState({ maxIndex, card, theme });
            })
            .catch(error => {
                this.navigateToLearnPage(); // Navigate to learn page on error
            });
    }

    isCustomDeck = () => {
        if (this.props.router.location.pathname.includes('/mydecks'))
            return true;
        else
            return false;
    }
    
    playColorAnimation = (command) => {
        const colors = {
            Correct: "green",
            Wrong: "red",
            Hide: "colorless"
        };

        this.setState({ isAnimating: true, changeColor: true, color: colors[command] });

        setTimeout(() => this.setState({changeColor: false, color: "" }), 600);
    };

    playFadeAnimation = () => {
        this.setState({ fade: true, fadeClass: "fade-out" });

        setTimeout(() => this.setState({ isAnimating: false, fade: false, fadeClass: "" }), 300);
    };

    handleCommandClick = (command) => {
        if (command === "Correct" || command === "Wrong" || command === "Hide") {
            //We play a short animation if the command is Correct or Wrong before updating the quizz
            this.playColorAnimation(command, 300);
            setTimeout(() => this.playFadeAnimation(), 600);
            setTimeout(() => this.setState(Quizz.updateQuizz(this.state.cardIndex, command)), 900); 


        } else { 
            //If the command is Show, update the quizz
            this.setState(Quizz.updateQuizz(this.state.cardIndex, command));
        }
    };

    navigateToLearnPage = () => {
        if (this.isCustomDeck())
            this.props.router.navigate("/mydecks");
        else
            this.props.router.navigate("/learn");
    }

    openFavoriteModal = () => {
        this.setState({
            favoriteModalClass: 'display',
            enableFavoriteModal: true,
            enableHideSingleCardModal: false
        });
        document.body.classList.add('modal-active');
    }

    openHideSingleCardModal = () => {
        this.setState({
            hideSingleCardModalClass: 'display',
            enableFavoriteModal: false,
            enableHideSingleCardModal: true
        });
        document.body.classList.add('modal-active');
    }

    closeModal = () => {
        this.setState({
            hideSingleCardModalClass: 'display out',
            favoriteModalClass: 'display out'
        });

        document.body.classList.remove('modal-active');
    }

    renderModal() {
        const { enableFavoriteModal, enableHideSingleCardModal, hideSingleCardModalClass, favoriteModalClass } = this.state;

        return (
            <>
                {enableFavoriteModal &&
                    <FavoriteModal modalClass={favoriteModalClass}
                        onClose={this.closeModal} 
                        card={this.state.card}/>
                }

                {enableHideSingleCardModal &&
                    <HideSingleCardModal modalClass={hideSingleCardModalClass}
                        onClose={this.closeModal}
                        commandHandler={this.handleCommandClick}
                        card={this.state.card} />
                }
            </>
        );
    }

    renderCardQuizz() {
        const {
            isAnswered,
            card,
            changeColor,
            color,
            fade,
            fadeClass,
            isAnimating,
            cardIndex,
            maxIndex
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
                    openHideSingleCardModal={this.openHideSingleCardModal}
                    openFavoriteModal={this.openFavoriteModal}
                />

                <QuizzButtonPanel isAnswered={isAnswered} isAnimating={isAnimating} commandHandler={this.handleCommandClick} />
                <QuizzProgressBar currentIndex={cardIndex} maxIndex={maxIndex} />
            </>
        );
    }

    renderElement() {
        const { isFinished, theme, score } = this.state;

        return (
            <>
                {this.renderModal()}

                <div className="content">
                    <QuizzTheme theme={theme} isFinished={isFinished} navigateToLearnPage={this.navigateToLearnPage} />

                    {!isFinished
                        && this.renderCardQuizz()}

                    {isFinished
                        && <QuizzResult correctCards={score.correctCards} wrongCards={score.wrongCards} />}

                    
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

export default withRouter(QuizzApp);