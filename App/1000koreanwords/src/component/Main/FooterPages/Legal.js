import '@app/style/footerpages.css';

export default function Legal() {
    return (
        <div className="component-footerpage fill-available-space">
            <h1 className="page-title">Legal Notice</h1>

            <div className="footerpage-section">
                <h2>1. Site Publisher</h2>
                <p>
                    This site is published on a personal basis by{' '}
                    <span className="footerpage-placeholder">[YOUR NAME]</span>.
                    <br />
                    Contact: <span className="footerpage-placeholder">[YOUR EMAIL]</span>
                </p>
                <p>
                    Published for personal, non-commercial purposes.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>2. Hosting</h2>
                <p>
                    This site is hosted by{' '}
                    <span className="footerpage-placeholder">[HOSTING PROVIDER NAME]</span>,
                    located at{' '}
                    <span className="footerpage-placeholder">[HOSTING PROVIDER ADDRESS]</span>.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>3. Intellectual Property</h2>
                <p>
                    All content on this site — including vocabulary lists, design, and source code — is protected
                    by copyright law. Any reproduction, representation, or distribution, in whole or in part,
                    without prior written authorization from the publisher, is prohibited and may constitute
                    an infringement under the French Intellectual Property Code.
                </p>
            </div>

            <div className="footerpage-section">
                <h2>4. Liability</h2>
                <p>
                    The information on this site is provided in good faith and for informational purposes only.
                    The publisher makes no guarantee as to the accuracy, completeness, or currency of the content.
                    The publisher accepts no liability for any errors or omissions in the published content.
                </p>
            </div>
        </div>
    );
}
