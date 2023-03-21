import React from "react";
import Quizz from "./logic/Quizz.js";
import DisplayIndex from "./DisplayIndex";
import DisplayWord from "./DisplayWord";
import DisplayScore from "./DisplayScore";
import ButtonPanel from "./ButtonPanel";
import TextToSpeech from "./TextToSpeech";
import {withRouter} from '@app/tool/withRouter'
import Button from "./Button.js";

class QuizzApp extends React.Component {
    componentDidMount() {
        const deckId = this.props.router.params.deckId

        Quizz.instantiateQuizzDeck(deckId)
            .then((res) => this.setState(res));
    }

    state = {
        isAnswered: false,
        isFinished: false,
        currentWord: { question: "", answer: "" },
        cardId: 0,
        maxIndex: 0,
        score: 0,
    };

    handleClick = buttonName => {
        this.setState(Quizz.updateQuizz(this.state.cardId, this.state.score, buttonName));
    };

    navigateToLearnPage = () => {
        this.props.router.navigate("/learn");
    }

    renderElement() {
        if (this.state.isFinished) {
            return (
                <>
                <DisplayScore score={this.state.score} maxScore={this.state.maxIndex} />
                <Button name="Done" clickHandler={this.navigateToLearnPage}/>
                </>
            )
        } else {
            return (
                <>
                    <DisplayIndex currentIndex={this.state.cardId + 1} maxIndex={this.state.maxIndex} />
                    <DisplayWord isAnswered={this.state.isAnswered} word={this.state.currentWord} />
                    <ButtonPanel isAnswered={this.state.isAnswered} clickHandler={this.handleClick} />
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