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
                        <strong>1000</strong>Korean<strong>Words</strong> 
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
        else
        {
            return (
                <div className="navbar-links">
                    {!location.pathname.includes("/login") && (
                        <div className="navbar-link">
                            <Link to="/login">Login</Link>
                        </div>
                    )}

                    {!location.pathname.includes("/register") && (
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
                {/* <div className='empty'></div> */}
                { this.displayLogo() }
                { this.displayLinks() }
                {/* { this.displayFeatures() } */}
                {/* <div className='empty'></div> */}
            </>
        )
    }
    render() {
            return (
                <nav className="component-navbar">
                        {this.renderElement()}
                </nav>
            )
    }
}

export default withRouter(Navbar);