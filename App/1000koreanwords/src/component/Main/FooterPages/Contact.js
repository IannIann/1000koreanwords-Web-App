import { Link } from 'react-router-dom';
import '@app/style/footerpages.css';

export default function Contact() {
    return (
        <div className="component-footerpage fill-available-space">
            <h1 className="page-title">Contact</h1>

            <div className="footerpage-section">
                <p>
                    Have a question, found a bug, or want to share feedback? Feel free to reach out.
                </p>
                <p>
                    You can contact us at:{' '}
                    <a href="mailto:[YOUR EMAIL]" className="footerpage-placeholder">[YOUR EMAIL]</a>
                </p>
            </div>

            <div className="footerpage-section">
                <h2>Data-related requests</h2>
                <p>
                    For any request regarding your personal data (access, rectification, deletion, portability),
                    please refer to our <Link to='/privacy/'>Privacy Policy</Link> for details on your rights
                    and how to exercise them.
                </p>
            </div>
        </div>
    );
}
