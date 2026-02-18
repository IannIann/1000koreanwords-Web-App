import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from '@app/tool/withRouter'
import AuthService from '@app/service/auth.service'

import '@app/style/navbar.css';

class Navbar extends React.Component {

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

    displayLogo = () => {
        return (
            <div className="navbar-logo">
                <Link to={"/homepage/"}>
                    <div>
                        <h1>1000<span style={{ color: "var(--teal)" }}>Korean</span>Words</h1>
                    </div>
                </Link>
            </div>
        )
    }

    displayLinks = () => {
        if (this.state.isLogged) {
            return (
                <div className="navbar-links">
                    <div className="navbar-link">
                        <Link to={"/learn/"}> Learn </Link>
                    </div>
                    <div className="navbar-link">
                        <Link to={"/mydecks/"}> My decks </Link>
                    </div>
                    <div className="navbar-link">
                        <Link to={"/logout/"}> Sign out </Link>
                    </div>
                </div>
            )
        }
        else if (!this.state.isLogged) {
            return (
                <div className="navbar-links">
                    {!location.pathname.includes("/login") && (
                        <div className="navbar-link">
                            <Link to="/login">Login</Link>
                        </div>
                    )}

                    {location.pathname.includes("/login") && (
                        <div className="navbar-link">
                            <Link to="/register">Sign up</Link>
                        </div>
                    )}
                </div>
            )
        }
    }

    renderElement() {
        return (
            <>
                {this.displayLogo()}
                {this.displayLinks()}
            </>
        )
    }
    render() {
        return (
            <div>
                <nav className="component-navbar">
                    {this.renderElement()}
                </nav>
            </div>
        )
    }
}

export default withRouter(Navbar);