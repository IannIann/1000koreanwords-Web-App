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
import { withRouter } from '@app/tool/withRouter'

class QuizzApp extends React.Component {

    state = {
        isAnswered: false,
        isFinished: false,
        currentWord: { question: "", answer: "" },
        cardId: 0,
        maxIndex: 0,
        score: 0,
        card: {},
    };

    componentDidMount() {

        const { deckId } = this.props.router.params;
        const isCustomDeck = this.isCustomDeck()

        Quizz.instantiateQuizzDeck(deckId, isCustomDeck)
            .then(({ currentWord, maxIndex, card }) => {
                this.setState({ currentWord, maxIndex, card });
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

    handleClick = command => {
        this.setState(Quizz.updateQuizz(this.state.cardId, this.state.score, command));
    };

    navigateToLearnPage = () => {
        if(this.isCustomDeck)
            this.props.router.navigate("/mydecks");
        else
            this.props.router.navigate("/learn");
    }

    renderElement() {
        const { isAnswered, isFinished, currentWord, cardId, maxIndex, score, card } = this.state;

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
                    <DisplayIndex currentIndex={cardId + 1} maxIndex={maxIndex} />
                    <DisplayWord isAnswered={isAnswered} word={currentWord} />
                    <ButtonPanel isAnswered={isAnswered} clickHandler={this.handleClick} />
                    <CardsOptionsMenu banCardClickHandler={this.handleClick} card={card} />
                    <BanCardDialog />
                    {/* <TextToSpeech lang={"ko"} word={this.state.currentWord.question} /> */}
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