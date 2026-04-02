import '@app/style/footerpages.css';

export default function Privacy() {
    return (
        <div className="component-footerpage fill-available-space">
            <h1 className="page-title">Privacy Policy</h1>

            <div className="footerpage-section">
                <h2>1. Data Controller</h2>
                <p>
                    The data controller responsible for your personal data is{' '}
                    <span className="footerpage-placeholder">[YOUR NAME]</span>, reachable at{' '}
                    <span className="footerpage-placeholder">[YOUR EMAIL]</span>.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>2. Data We Collect</h2>
                <p>We collect the following personal data:</p>
                <ul>
                    <li><strong>Account information:</strong> username, email address, and hashed password</li>
                    <li><strong>Usage data:</strong> deck progress, quiz results, and custom decks you create</li>
                </ul>
                <p>We do not collect payment data, location data, or any sensitive personal information.</p>
            </div>

            <div className="footerpage-section">
                <h2>3. How We Use Your Data</h2>
                <p>Your data is used to:</p>
                <ul>
                    <li>Create and manage your account</li>
                    <li>Track and display your learning progress</li>
                    <li>Send password reset emails when requested</li>
                </ul>
                <p>We do not sell, rent, or share your personal data with third parties.</p>
            </div>

            <div className="footerpage-section">
                <h2>4. Legal Basis (GDPR Art. 6)</h2>
                <p>
                    Processing is based on <strong>contract performance</strong> (Art. 6(1)(b)) for providing
                    the service you signed up for, and <strong>legitimate interest</strong> (Art. 6(1)(f))
                    for maintaining service security and integrity.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>5. Data Retention</h2>
                <p>
                    Your data is retained for as long as your account is active. Upon account deletion,
                    all associated personal data is permanently erased within 30 days.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>6. Your Rights</h2>
                <p>Under the GDPR, you have the right to:</p>
                <ul>
                    <li>Access the personal data we hold about you</li>
                    <li>Rectify inaccurate or incomplete data</li>
                    <li>Request erasure of your data ("right to be forgotten")</li>
                    <li>Request data portability</li>
                    <li>Object to processing based on legitimate interest</li>
                </ul>
                <p>
                    To exercise any of these rights, contact us at{' '}
                    <span className="footerpage-placeholder">[YOUR EMAIL]</span>.
                    We will respond within 30 days.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>7. Cookies</h2>
                <p>
                    We use a single session cookie strictly necessary for authentication.
                    No tracking cookies, advertising cookies, or third-party analytics cookies are used.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>8. Contact</h2>
                <p>
                    For any privacy-related questions, reach us at{' '}
                    <span className="footerpage-placeholder">[YOUR EMAIL]</span>.
                    You also have the right to lodge a complaint with the{' '}
                    <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a>{' '}
                    (Commission Nationale de l'Informatique et des Libertés).
                </p>
            </div>
        </div>
    );
}
