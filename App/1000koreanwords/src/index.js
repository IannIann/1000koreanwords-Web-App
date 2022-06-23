import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import App from './component/App';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);