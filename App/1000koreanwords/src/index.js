import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter as Router } from 'react-router-dom'
import App from '@app/component/App';
import '@app/style/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <PrimeReactProvider>
        <Router>
            <App />
        </Router>
    </PrimeReactProvider>
);