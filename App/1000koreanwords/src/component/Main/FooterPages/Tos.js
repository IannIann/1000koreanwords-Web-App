import '@app/style/footerpages.css';

export default function Tos() {
    return (
        <div className="component-footerpage fill-available-space">
            <h1 className="page-title">Terms of Service</h1>

            <div className="footerpage-section">
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using 1000 Korean Words, you agree to be bound by these Terms of Service.
                    If you do not agree, please do not use this service.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>2. Description of Service</h2>
                <p>
                    1000 Korean Words is a vocabulary learning application that allows users to study
                    Korean words through flashcard decks and quizzes. An account is required to access
                    all features and to save your progress.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>3. User Accounts</h2>
                <p>
                    You must be at least 15 years old to create an account.
                    If you are under 15, you may not use this service without verified parental consent.
                </p>
                <p>
                    You are responsible for maintaining the confidentiality of your account credentials
                    and for all activity carried out under your account. We reserve the right to limit,
                    remove duplicate accounts, and suspend or terminate any account
                    that violates these Terms, without prior notice.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>4. Acceptable Use</h2>
                <p>You agree not to:</p>
                <ul>
                    <li>Use the service for any unlawful purpose</li>
                    <li>Attempt to scrape, crawl, or harvest data from the platform</li>
                    <li>Interfere with or disrupt the integrity or performance of the service</li>
                    <li>Attempt to gain unauthorized access to any part of the service</li>
                </ul>
            </div>

            <div className="footerpage-section">
                <h2>5. Intellectual Property</h2>
                <p>
                    All content provided by the service, including the built-in Korean word lists,
                    design, and code, is owned by or licensed to the site operator and may not be
                    reproduced without prior written consent. Flashcard decks created by users remain
                    the property of their respective creators. By submitting content to the service,
                    you grant us a limited, non-exclusive license to store and display it solely for
                    the purpose of operating the service.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>6. Disclaimer</h2>
                <p>
                    The service is provided "as is" without warranties of any kind. We do not guarantee
                    the accuracy, completeness, or suitability of the vocabulary content for any particular
                    purpose. We shall not be liable for any loss of data, interruption of service, 
                    or any indirect damages arising from the use of the service.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>7. Governing Law</h2>
                <p>
                    These Terms are governed by French law. Any dispute arising from the use of this
                    service shall be subject to the exclusive jurisdiction of the French courts.
                    For any questions, contact{' '}
                    <span className="footerpage-placeholder">[YOUR NAME]</span> at{' '}
                    <span className="footerpage-placeholder">[YOUR EMAIL]</span>.
                </p>
            </div>
        </div>
    );
}
