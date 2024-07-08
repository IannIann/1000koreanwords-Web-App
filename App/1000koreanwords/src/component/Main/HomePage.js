import React from 'react';
import { Link } from "react-router-dom";
import AuthService from '@app/service/auth.service'
import Logout from './Login/Logout';

export default class HomePage extends React.Component {

    state = {
        currentUser: AuthService.getCurrentUser()
    };

    displayLinks = () => {
        if (this.state.currentUser) {
            return (
                <div>
                    <Link to={"/learn/"}> <button>{"Start"}</button> </Link>
                    <Link to={"/logout/"}> <button>{"Logout"}</button> </Link>
                </div>)
        } else {
            return (
                <div>
                    <Link to={"/register/"}> <button>{"Register"}</button> </Link>
                    <Link to={"/login/"}> <button>{"Login"}</button> </Link>
                </div>)
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