import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@app/tool/AuthContext';
import Loader from '@app/component/Main/Loader';
import QuizzDemo from '@app/component/Quizz/QuizzDemo';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import '@app/style/homepage.css';

export default function HomePage() {
    const { isLogged } = useAuth();

    useEffect(() => {
        document.title = "1000 Korean Words - Learn Korean Vocabulary";
    }, []);

    if (isLogged === null) {
        return <div className="component-homepage"><Loader /></div>;
    }

    return (
        <div className="component-homepage">
            <div>
                <header className="hero">
                    <div className="hero-text">
                        <h1>Learn. <span className="highlight">Remember.</span> Master.</h1>
                        <p>
                            Learn the 1,000 essential Korean words that cover up to 80% of everyday conversations.
                            Choose a theme, select your level, and start building vocabulary.
                            <br />New to Korean? <Link to="/hangul/" className="hero-hangeul-link">Learn to read 한글</Link> first.
                        </p>

                        {isLogged ? (
                            <Link to="/learn/"><ButtonFlat label="Start Learning" customClass="button-hero" /></Link>
                        ) : (
                            <Link to="/register/"><ButtonFlat label="Start Your Journey — Free" customClass="button-hero" /></Link>
                        )}

                        <section className="features">
                            <div className="feature-item">
                                <span className="feature-icon pi pi-book"></span>
                                <div className="feature-text">
                                    <h3>Theme-Based</h3>
                                    <p>From <b>Everyday Expressions</b> to <b>Business</b> vocabulary. Learn words you will actually use in real life.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon pi pi-chart-line"></span>
                                <div className="feature-text">
                                    <h3>Difficulty Levels</h3>
                                    <p>Progress naturally from <b>Beginner</b> to <b>Advanced</b> with structured decks.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon pi pi-box"></span>
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
                </header>
            </div>
        </div>
    );
}
