import { useEffect } from 'react';
import '@app/style/footerpages.css';

export default function Legal() {
    useEffect(() => { document.title = "Legal Notice | 1000 Korean Words"; }, []);
    return (
        <div className="component-footerpage fill-available-space">
            <h1 className="page-title">Legal Notice</h1>

            <div className="footerpage-section">
                <h2>1. Site Publisher</h2>
                <p>
                    Publication director and site publisher:{' '}
                    <span>Iann</span>
                    <br />
                    Contact: <a href="mailto:contact@1000koreanwords.com">contact@1000koreanwords.com</a>
                </p>
            </div>

            <div className="footerpage-section">
                <h2>2. Hosting</h2>
                <p>
                    This site is hosted by{' '}
                    <span>Vercel Inc.</span>,
                    located at{' '}
                    <span>440 N Barranca Avenue #4133, Covina, CA 91723, United States</span>,
                    reachable at{' '}
                    <a href="https://vercel.com/contact" target="_blank" rel="noopener noreferrer">https://vercel.com/contact</a>
                </p>
            </div>

            <div className="footerpage-section">
                <h2>3. Intellectual Property</h2>
                <p>
                    All content on this site, including vocabulary lists, design, and source code, is protected
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
