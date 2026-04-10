import './instrument';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import App from '@app/component/App';
import '@app/style/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>} showDialog>
        <Router>
            <App />
        </Router>
    </Sentry.ErrorBoundary>
);
