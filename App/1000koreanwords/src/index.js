import { PrimeReactProvider } from "primereact/api";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './component/App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <PrimeReactProvider>
        <Router>
            <App />
        </Router>
    </PrimeReactProvider>
);