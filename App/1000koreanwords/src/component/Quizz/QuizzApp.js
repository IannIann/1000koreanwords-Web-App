import React from 'react';
import Quizz from './logic/Quizz.js';
import Card from '@app/component/Card/Card';
import { toast } from 'react-toastify';
import { withRouter } from '@app/tool/withRouter';
import QuizzProgress from '@app/component/Quizz/QuizzProgress.js';
import QuizzActions from '@app/component/Quizz/QuizzActions.js';
import QuizzResult from '@app/component/Quizz/QuizzResult.js';
import HideSingleCardModal from '@app/component/Modals/HideSingleCardModal';
import FavoriteModal from '@app/component/Modals/FavoriteModal';
import Loader from '@app/component/Main/Loader';
import '@app/style/quizzapp.css';

class QuizzApp extends React.Component {
    state = {
        card: {},
        score: {},
        theme: '',
        krTheme: '',
        isLoading: true,
        isAnswered: false,
        isFinished: false,
        isAnimating: false,
        isDeckFullyCompleted: false,

        cardIndex: 0,
        maxIndex: 0,
        scoreIndex: 0,

        changeColor: false,
        color: '',

        fade: false,
        fadeClass: '',

        favoriteModalClass: '',
        hideSingleCardModalClass: '',
        enableFavoriteModal: false,
        enableHideSingleCardModal: false,
    };

    componentDidMount() {
        this.startQuizz();
    }

    componentDidUpdate(_prevProps, prevState) {
        if (prevState.isFinished !== this.state.isFinished && this.state.isFinished) {
            this.updateDeckCompletion();
        }
    }

    isCustomDeck = () => this.props.router.location.pathname.includes('/mydecks');

    startQuizz = () => {
        const { deckId } = this.props.router.params;

        this.setState({ isLoading: true });
        Quizz.instantiateQuizzDeck(deckId, this.isCustomDeck())
            .then(({ maxIndex, card, theme, krTheme }) => {
                if (maxIndex <= 0)
                    throw new Error('Quizz deck is empty');

                this.setState({ card, theme, krTheme, cardIndex: 0, scoreIndex: 0, maxIndex, isFinished: false, isAnswered: false, isLoading: false });
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to load deck');
                this.navigateToLearnPage();
            });
    }

    updateDeckCompletion = () => {
        Quizz.updateDeckState();
    }

    playColorAnimation = (command) => {
        const colors = { Correct: 'green', Wrong: 'red', Hide: 'colorless' };

        this.setState({ isAnimating: true, changeColor: true, color: colors[command] });
        setTimeout(() => this.setState({ changeColor: false, color: '' }), 600);
    };

    playFadeAnimation = () => {
        this.setState({ fade: true, fadeClass: 'fade-out' });
        setTimeout(() => this.setState({ isAnimating: false, fade: false, fadeClass: '' }), 300);
    };

    handleCommandClick = (command) => {
        if (command === 'Correct' || command === 'Wrong' || command === 'Hide') {
            this.setState({ scoreIndex: this.state.scoreIndex + 1 });
            this.playColorAnimation(command);
            setTimeout(() => this.playFadeAnimation(), 600);
            setTimeout(() => this.setState(Quizz.updateQuizz(this.state.cardIndex, command)), 900);
        } else {
            this.setState(Quizz.updateQuizz(this.state.cardIndex, command));
        }
    };

    navigateToLearnPage = () => {
        this.props.router.navigate(this.isCustomDeck() ? '/mydecks' : '/learn');
    }

    openFavoriteModal = () => {
        this.setState({ favoriteModalClass: 'display', enableFavoriteModal: true, enableHideSingleCardModal: false });
        document.body.classList.add('modal-active');
    }

    openHideSingleCardModal = () => {
        this.setState({ hideSingleCardModalClass: 'display', enableFavoriteModal: false, enableHideSingleCardModal: true });
        document.body.classList.add('modal-active');
    }

    closeModal = () => {
        this.setState({ hideSingleCardModalClass: 'display out', favoriteModalClass: 'display out' });
        document.body.classList.remove('modal-active');
        setTimeout(() => {
            this.setState({ enableFavoriteModal: false, enableHideSingleCardModal: false });
        }, 500);
    }

    renderModal() {
        const { enableFavoriteModal, enableHideSingleCardModal, hideSingleCardModalClass, favoriteModalClass } = this.state;

        return (
            <>
                {enableFavoriteModal &&
                    <FavoriteModal
                        modalClass={favoriteModalClass}
                        onClose={this.closeModal}
                        card={this.state.card}
                    />
                }
                {enableHideSingleCardModal &&
                    <HideSingleCardModal
                        modalClass={hideSingleCardModalClass}
                        onClose={this.closeModal}
                        commandHandler={this.handleCommandClick}
                        card={this.state.card}
                    />
                }
            </>
        );
    }

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
                    openHideSingleCardModal={this.openHideSingleCardModal}
                    openFavoriteModal={this.openFavoriteModal}
                    displayButtons={true}
                />
                <QuizzActions isAnswered={isAnswered} isAnimating={isAnimating} commandHandler={this.handleCommandClick} />
            </div>
        );
    }

    render() {
        const { isLoading, isFinished, theme, krTheme, score, isDeckFullyCompleted, maxIndex, scoreIndex } = this.state;

        if (isLoading) return <Loader />;

        return (
            <div className="component-quizz-app fill-available-space">
                <div className="content">
                    {this.renderModal()}

                    <div className="page-title">{theme}</div>
                    <div className="page-subtitle">{krTheme}</div>

                    {!isFinished && this.renderCardQuizz()}

                    {isFinished &&
                        <QuizzResult
                            correctCards={score.correctCards}
                            wrongCards={score.wrongCards}
                            restartQuizz={this.startQuizz}
                            navigateToLearnPage={this.navigateToLearnPage}
                            isDeckFullyCompleted={isDeckFullyCompleted}
                        />
                    }

                    {!isFinished &&
                        <QuizzProgress
                            scoreIndex={scoreIndex}
                            maxIndex={maxIndex}
                            label="QUESTION"
                        />
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(QuizzApp);
