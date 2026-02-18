import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from '@app/tool/withRouter'

import '@app/style/footer.css';

class Footer extends React.Component {

    displayLinks = () => {
            return (
                <div className="footer-links">
                    <div className="footer-link">
                        <Link to={"/tos/"}> Terms </Link>
                    </div>
                    <div className="footer-link">
                        <Link to={"/privacy/"}> Privacy </Link>
                    </div>
                    <div className="footer-link">
                        <Link to={"/legal/"}> Legal </Link>
                    </div>
                    <div className="footer-link">
                        <Link to={"/contact/"}> Contact </Link>
                    </div>
                    <div className="footer-link">
                        <Link to={"/hangeul/"}> 한글 </Link>
                    </div>
                </div>
            )
    }

    renderElement() {
        return (
            <>
                { this.displayLinks() }
            </>
        )
    }
    render() {
            return (
                <div className="component-footer">
                        {this.renderElement()}
                </div>
            )
    }
}

export default withRouter(Footer);