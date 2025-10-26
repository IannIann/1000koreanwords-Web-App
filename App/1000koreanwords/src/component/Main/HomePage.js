import React from 'react';
import { Link } from "react-router-dom";
import AuthService from '@app/service/auth.service'

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

    displayLinks = () => {
        if (this.state.isLogged) {
            return (
                <div>
                    <Link to={"/learn/"}> <button>{"Start"}</button> </Link>
                    <Link to={"/logout/"}> <button>{"Logout"}</button> </Link>
                </div>)
        } else if (this.state.isLogged === false) {
            return (
                <div>
                    <Link to={"/register/"}> <button>{"Register"}</button> </Link>
                    <Link to={"/login/"}> <button>{"Login"}</button> </Link>
                </div>)
        } else {
            return (
                <div>
                    <div>Loading...</div>
                </div>
            )
        }   
    }

    renderElement() {
        return (
            <>
                <h1>1000 Korean Words</h1>
                { this.displayLinks() }
            </>
        )
    }

    render() {
        return (
            <div className="component-home-page">
                {this.renderElement()}
            </div>
        )
    }
}