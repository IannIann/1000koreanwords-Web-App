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

import HideSingleCardModal from '@app/component/Modals/HideSingleCardModal';
import FavoriteModal from '@app/component/Modals/FavoriteModal';

import "@app/style/quizzapp.css";

class QuizzApp extends React.Component {

    state = {
        card: {},
        theme: "",
        isAnswered: false,
        isFinished: false,
        playAnimation : false,
        animationDirection : "",
        cardIndex: 0,
        maxIndex: 0,
        score: 0,

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
    
    setAnimation = (command) => {
        const directions = {
            Correct: "left",
            Wrong: "right"
        };

        const animationState = {
            playAnimation: true,
            animationDirection: directions[command]
        };

        this.setState(animationState);

        setTimeout(() => this.setState({ playAnimation: false, animationDirection: "" }), 300);
    };

    handleCommandClick = (command) => {
        if (command === "Correct" || command === "Wrong") {
            this.setAnimation(command);
            setTimeout(() => this.setState(Quizz.updateQuizz(this.state.cardIndex, this.state.score, command)), 300);
        } else {
            this.setState(Quizz.updateQuizz(this.state.cardIndex, this.state.score, command));
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

    renderElement() {
        const { 
            isAnswered,
            isFinished,
            cardIndex,
            maxIndex,
            score,
            card,
            theme,
            enableFavoriteModal,
            enableHideSingleCardModal,
            hideSingleCardModalClass,
            favoriteModalClass,
            playAnimation,
            animationDirection
        } = this.state;

        if (isFinished) {
            return (
                <>
                    <DisplayScore score={score} maxScore={maxIndex} />
                    <CommandButton name="Done" clickHandler={this.navigateToLearnPage} />
                </>
            )
        } else {
            return (
                <>
                    {enableFavoriteModal &&
                        <FavoriteModal modalClass={favoriteModalClass}
                            onClose={this.closeModal} 
                            card={card}/>
                    }

                    {enableHideSingleCardModal &&
                        <HideSingleCardModal modalClass={hideSingleCardModalClass}
                            onClose={this.closeModal}
                            commandHandler={this.handleCommandClick}
                            card={card} />
                    }

                    <div className="content">
                        <h1>{theme}</h1>

                        <Card card={card}
                            inPlay={true}
                            isAnswered={isAnswered}
                            playAnimation={playAnimation}
                            animationDirection={animationDirection}
                            openHideSingleCardModal={this.openHideSingleCardModal}
                            openFavoriteModal={this.openFavoriteModal}
                        />
                        <QuizzButtonPanel isAnswered={isAnswered} commandHandler={this.handleCommandClick} />
                        <QuizzProgressBar currentIndex={cardIndex} maxIndex={maxIndex} />
                    </div>
                </>
            );
        }
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