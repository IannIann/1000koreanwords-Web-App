import React from 'react';
import { Link } from "react-router-dom";
import '@app/style/navbar.css';
import AuthService from '@app/service/auth.service'

let isLogged = AuthService.getCurrentUser();

export default class Navbar extends React.Component {

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
      return (
        <div id="navbar-links">
            <Link className="navbar-item" to={"/learn/"}> Learn </Link>
            <Link className="navbar-item" to={"/home/"}> My decks </Link>
        </div>
      )
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
                { this.displayLogo() }
                { this.displayLinks() }
                { this.displayFeatures() }
            </>
        )
    }
    render() {
        if(isLogged)
        {
            return (
                <nav className="component-navbar">
                        {this.renderElement()}
                </nav>
            )
        } else
        {
            return null
        }
    }
}