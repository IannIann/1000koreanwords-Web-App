import React from 'react';
import { Link } from "react-router-dom";
import AuthService from '@app/service/auth.service'
import Loader from './Loader';
import ButtonPushable from '@app/component/Buttons/ButtonPushable';
import QuizzDemo from '@app/component/Quizz/QuizzDemo';
import '@app/style/homepage.css';

export default class HomePage extends React.Component {

    state = {
        isLogged: null
    };

    componentDidMount() {
        this.isUserLoggedIn();
    }

    async isUserLoggedIn() {
        await AuthService.checkAuthToken()
            .then((res) => this.setState({ isLogged: res.valid }));
    }

    displayUserHomePage = () => {
        return (
            <div>
                <Link to={"/learn/"}> <button>{"Start"}</button> </Link>
                <Link to={"/logout/"}> <button>{"Logout"}</button> </Link>
            </div>
        )
    }

    displayGuestHomePage = () => {
        return (
            <>
                <header className="hero">
                    <div className="hero-text">
                        <h1>Learn. <span class="highlight">Remember.</span> Repeat.</h1>
                        <p>Learn 1,000+ korean words through themed flashcard decks. Pick a theme, choose your level, and start learning.</p>
                        {/* <Link to={"/register/"}> <ButtonPushable label="Join for Free" size="big" color="green" /> </Link> */}
                    <a href="#" className="btn-cta">Start Your Journey — Free</a>

                    
                        <section className="features">
                            <div className="feature-item">
                                <span className="feature-icon pi pi-book"></span>
                                <div className="feature-text">
                                    <h3>Theme-Based</h3>
                                    <p>From <b>Everyday Expressions</b> to <b>Business</b> vocabulary. Learn words you will actually use.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon pi pi-chart-line"></span>
                                <div className="feature-text">
                                    <h3>Difficulty Levels</h3>
                                    <p>Progress naturally from <b>Beginner</b> to <b>Advanced</b> with pre-built decks.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon pi pi-cog"></span>
                                <div className="feature-text">
                                    <h3>Custom Decks</h3>
                                    <p>Build your own personalized library. Add the words <b>you</b> want to master.</p>
                                </div>
                            </div>
                        </section>
                    
                    </div>

                    <div className="hero-demo">
                        <QuizzDemo />
                    </div>
                </header >


            </>
        )
    }

    displayHomePage = () => {
        if (this.state.isLogged) {
            return (this.displayUserHomePage())
        } else if (this.state.isLogged === false) {
            return (this.displayGuestHomePage())
        } else {
            return (<Loader />)
        }
    }

    render() {
        return (
            <div className="component-homepage">
                {this.displayHomePage()}
            </div>
        )
    }
}