import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@app/tool/AuthContext';

import '@app/style/navbar.css';

export default function Navbar() {
    const { isLogged } = useAuth();
    const { pathname } = useLocation();

    const renderLogo = () => (
        <div className="navbar-logo">
            <Link to="/homepage/">
                <h1>1000<span style={{ color: 'var(--teal)' }}>Korean</span>Words</h1>
            </Link>
        </div>
    );

    const renderLinks = () => {
        if (isLogged === null) return null;

        if (isLogged) {
            return (
                <div className="navbar-links">
                    <div className="navbar-link"><Link to="/learn/"> Learn </Link></div>
                    <div className="navbar-link"><Link to="/mydecks/"> My decks </Link></div>
                    <div className="navbar-link"><Link to="/hangul/"> 한글 </Link></div>
                    <div className="navbar-link"><Link to="/logout/"> Sign out </Link></div>
                </div>
            );
        }

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
    };

    return (
        <div>
            <nav className="component-navbar">
                {renderLogo()}
                {renderLinks()}
            </nav>
        </div>
    );
}
