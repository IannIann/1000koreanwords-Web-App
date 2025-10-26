import React from 'react';
import { Link } from "react-router-dom";
import AuthService from '@app/service/auth.service'

// import '@app/style/navbar.css';

export default class Navbar extends React.Component {

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
            <div id="navbar-logo">
                <Link to={"/homepage/"}>
                    <img id="navbar-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1920px-Flag_of_South_Korea.svg.png" />
                </Link>
            </div>
        )
    }

    displayLinks = () => {
        if (this.state.isLogged) {
            return (
                <div className="navbar-links">
                    <div className="navbar-link">
                        <Link to={"/homepage/"}> Home </Link>
                    </div>
                    <div className="navbar-link">
                        <Link to={"/learn/"}> Learn </Link>
                    </div>
                    <div className="navbar-link">
                        <Link to={"/mydecks/"}> My decks </Link>
                    </div>
                    <div className="navbar-link">
                        <Link to={"/profile/"}> Profile </Link>
                    </div>
                    <div className="navbar-link">
                        <Link to={"/logout/"}> Quit </Link>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div className="navbar-links">
                    <div className="navbar-link">
                        <Link to={"/homepage/"}> Home </Link>
                    </div>
                    <div className="navbar-link">
                        <Link to={"/login/"}> Login </Link>
                    </div>
                    <div className="navbar-link">
                        <Link to={"/register/"}> Register </Link>
                    </div>
                </div>
            )
        }
    }

    displayFeatures = () => {
        return (
            <div id="navbar-features">
                <Link className="navbar-item" to={"/profile/"}> <i className="pi pi-user"></i> </Link>
                <Link className="navbar-item" to={"/logout/"}> <i className="pi pi-power-off"></i></Link>
            </div>)
    }


    renderElement() {
        return (
            <>
                <div className='empty'></div>
                {/* { this.displayLogo() } */}
                {this.displayLinks()}
                {/* { this.displayFeatures() } */}
                <div className='empty'></div>
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