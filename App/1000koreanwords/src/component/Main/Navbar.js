import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '@app/tool/withRouter';
import AuthService from '@app/service/auth.service';

import '@app/style/navbar.css';

class Navbar extends React.Component {

    state = {
        isLogged: null
    };

    componentDidMount() {
        this.checkLoginStatus();
    }

    componentDidUpdate(prevProps) {
        if (this.props.router.location.pathname !== prevProps.router.location.pathname) {
            this.checkLoginStatus();
        }
    }

    async checkLoginStatus() {
        const res = await AuthService.checkAuthToken();
        this.setState({ isLogged: res.valid });
    }

    renderLogo() {
        return (
            <div className="navbar-logo">
                <Link to="/homepage/">
                    <h1>1000<span style={{ color: 'var(--teal)' }}>Korean</span>Words</h1>
                </Link>
            </div>
        );
    }

    renderLinks() {
        const { isLogged } = this.state;

        if (isLogged === null) return null;

        if (isLogged) {
            return (
                <div className="navbar-links">
                    <div className="navbar-link"><Link to="/learn/"> Learn </Link></div>
                    <div className="navbar-link"><Link to="/mydecks/"> My decks </Link></div>
                    <div className="navbar-link"><Link to="/hangeul/"> 한글 </Link></div>
                    <div className="navbar-link"><Link to="/logout/"> Sign out </Link></div>
                </div>
            );
        }

        const { pathname } = this.props.router.location;
        return (
            <div className="navbar-links">
                {!pathname.includes('/login') && (
                    <div className="navbar-link"><Link to="/login">Login</Link></div>
                )}
                {pathname.includes('/login') && (
                    <div className="navbar-link"><Link to="/register">Sign up</Link></div>
                )}
            </div>
        );
    }

    render() {
        return (
            <div>
                <nav className="component-navbar">
                    {this.renderLogo()}
                    {this.renderLinks()}
                </nav>
            </div>
        );
    }
}

export default withRouter(Navbar);
