import React from "react";
import Quizz from "./logic/Quizz.js";
import Card from "@app/component/Card/Card";
import { withRouter } from '@app/tool/withRouter'
import QuizzProgress from "@app/component/Quizz/QuizzProgress.js";
import QuizzButtonPanel from "@app/component/Buttons/QuizzButtonPanel.js";
import QuizzResult from "@app/component/Quizz/QuizzResult.js";
import QuizzTheme from "@app/component/Quizz/QuizzTheme.js";

import HideSingleCardModal from '@app/component/Modals/HideSingleCardModal';
import FavoriteModal from '@app/component/Modals/FavoriteModal';

import "@app/style/quizzapp.css";

class QuizzApp extends React.Component {
    state = {
        card: {},
        score: {},
        theme: "",
        isAnswered: false,
        isFinished: false,
        isAnimating: false,

        cardIndex: 0,
        maxIndex: 0,
        scoreIndex: 0,

        changeColor: false,
        color: "",

        fade: false,
        fadeClass: "",

        enableFavoriteModal: true,
        enableHideSingleCardModal: true
    };

    componentDidMount() {
        this.startQuizz();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isFinished !== this.state.isFinished && this.state.isFinished) {
            this.updateDeckCompletion();
        }
    }

    startQuizz = () => {
        const { deckId } = this.props.router.params;
        const isCustomDeck = this.isCustomDeck()

        Quizz.instantiateQuizzDeck(deckId, isCustomDeck)
            .then(({ maxIndex, card, theme, krTheme }) => {

                if (maxIndex <= 0)
                    throw new Error("Quizz deck is empty");

                this.setState({card, theme, krTheme, cardIndex: 0, scoreIndex: 0, maxIndex, isFinished: false, isAnswered: false});
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

    updateDeckCompletion = () => {
        const { deckId } = this.props.router.params;
        const isCustomDeck = this.isCustomDeck();

        Quizz.updateDeckState()
            .then(() => {
                Quizz.checkDeckFullCompletion(deckId, isCustomDeck)
                    .then(isDeckFullyCompleted => {
                        this.setState({ isDeckFullyCompleted });
                    });
            });
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
                        card={this.state.card} />
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
            fadeClass,
            isAnimating,
            maxIndex,
            scoreIndex
        } = this.state;

        return (

            

            <div className={`quizz-wrapper ${fadeClass}`}>
                <Card card={card}
                    inPlay={true}
                    isAnswered={isAnswered}
                    changeColor={changeColor}
                    color={color}
                    openHideSingleCardModal={this.openHideSingleCardModal}
                    openFavoriteModal={this.openFavoriteModal}
                    displayButtons={true}
                />

                <QuizzButtonPanel isAnswered={isAnswered} isAnimating={isAnimating} commandHandler={this.handleCommandClick} />
                
            </div>
        );
    }

    renderElement() {
        const { isFinished, theme, krTheme, score, isDeckFullyCompleted, maxIndex, scoreIndex } = this.state;

        return (
            <>
                {this.renderModal()}

                <div className="content">
                    <div className="page-title">{theme}</div>
                    <div className="page-subtitle">{krTheme}</div>

                    {!isFinished && (
                        <>
                            {this.renderCardQuizz()}

                        </>
                    )}

                    {isFinished
                        && <QuizzResult
                            correctCards={score.correctCards}
                            wrongCards={score.wrongCards}
                            restartQuizz={this.startQuizz}
                            navigateToLearnPage={this.navigateToLearnPage}
                            isDeckFullyCompleted={isDeckFullyCompleted}
                        />}


                    {!isFinished && (
                            <QuizzProgress
                                scoreIndex={scoreIndex}
                                maxIndex={maxIndex}
                            />
                    )}
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