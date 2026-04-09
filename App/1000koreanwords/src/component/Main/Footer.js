import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '@app/tool/withRouter';

import '@app/style/footer.css';

class Footer extends React.Component {

    render() {
        return (
            <div className="component-footer">
                <div className="footer-links">
                    <div className="footer-link"><Link to="/tos/">Terms</Link></div>
                    <div className="footer-link"><Link to="/privacy/">Privacy</Link></div>
                    <div className="footer-link"><Link to="/legal/">Legal</Link></div>
                    <div className="footer-link"><Link to="/contact/">Contact</Link></div>
                    <div className="footer-link"><Link to="/hangul/">한글</Link></div>
                </div>
            </div>
        );
    }
}

export default withRouter(Footer);