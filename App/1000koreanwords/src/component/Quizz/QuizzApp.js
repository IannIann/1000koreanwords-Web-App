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
import ButtonPushable from "@app/component/Buttons/ButtonPushable.js";
import QuizzButtonPanel from "@app/component/Buttons/QuizzButtonPanel.js";

import HideSingleCardModal from '@app/component/Modals/HideSingleCardModal';
// import CopyToDeckModal from '@app/component/Modals/CopyToDeckModal';

import "@app/style/quizzapp.css";

class QuizzApp extends React.Component {

    state = {
        card: {},
        theme: "",
        isAnswered: false,
        isFinished: false,
        cardIndex: 0,
        maxIndex: 0,
        score: 0,

        enableCopyToDeckModal: true,
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

    handleCommandClick = command => {
        this.setState(Quizz.updateQuizz(this.state.cardIndex, this.state.score, command));
    };

    navigateToLearnPage = () => {
        if (this.isCustomDeck())
            this.props.router.navigate("/mydecks");
        else
            this.props.router.navigate("/learn");
    }

    openCopyToDeckModal = () => {
        this.setState({
            copyToDeckModalClass: 'display',
            enableCopyToDeckModal: true,
            enableHideSingleCardModal: false
        });
        document.body.classList.add('modal-active');
    }

    openHideSingleCardModal = () => {
        this.setState({
            hideSingleCardModalClass: 'display',
            enableCopyToDeckModal: false,
            enableHideSingleCardModal: true
        });
        document.body.classList.add('modal-active');
    }

    closeModal = () => {
        this.setState({
            hideSingleCardModalClass: 'display out',
            copyToDeckModalClass: 'display out'
        });

        document.body.classList.remove('modal-active');
    }

    renderElement() {
        const { isAnswered,
            isFinished,
            cardIndex,
            maxIndex,
            score,
            card,
            theme,
            enableCopyToDeckModal,
            enableHideSingleCardModal,
            hideSingleCardModalClass,
            copyToDeckModalClass
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

                // <>
                //     
                //     <DisplayWord isAnswered={isAnswered} word={currentWord} />
                //     <ButtonPanel isAnswered={isAnswered} clickHandler={this.handleCommandClick} />
                //     <CardsOptionsMenu banCardClickHandler={this.handleCommandClick} card={card} />
                //     <BanCardDialog />
                //     {/* <TextToSpeech lang={"ko"} word={this.state.currentWord.question} /> */}
                // </>
                <>
                {/* 
                    {enableCopyToDeckModal &&
                        <CopyToDeckModal modalClass={copyToDeckModalClass}
                            onClose={this.closeModal} />
                    } */}

                    {enableHideSingleCardModal &&
                        <HideSingleCardModal modalClass={hideSingleCardModalClass}
                            onClose={this.closeModal}                             
                            commandHandler={this.handleCommandClick}/>
                    }

                    <div className="content">
                        <h1>{theme}</h1>

                        <Card card={card}
                            inPlay={true}
                            isAnswered={isAnswered}
                            openHideSingleCardModal={this.openHideSingleCardModal}
                            openCopyToDeckModal={this.openCopyToDeckModal}

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