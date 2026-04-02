import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from '@app/component/Main/Navbar';
import Footer from '@app/component/Main/Footer';
import HomePage from '@app/component/Main/HomePage';
import RegisterForm from '@app/component/Main/Authentification/RegisterForm';
import LoginForm from '@app/component/Main/Authentification/LoginForm';
import Logout from '@app/component/Main/Authentification/Logout';
import ForgotPassword from '@app/component/Main/Authentification/ForgotPassword';
import ResetPassword from '@app/component/Main/Authentification/ResetPassword';
import DecksManager from '@app/component/DecksManager/DecksManager';
import CustomDecksManager from '@app/component/DecksManager/CustomDecksManager';
import QuizzApp from '@app/component/Quizz/QuizzApp';
import EditPage from '@app/component/DeckEdition/EditPage';
import { AlreadyLogged, Private } from '@app/tool/customRoute';
import Tos from '@app/component/Main/FooterPages/Tos';
import Privacy from '@app/component/Main/FooterPages/Privacy';
import Legal from '@app/component/Main/FooterPages/Legal';
import Contact from '@app/component/Main/FooterPages/Contact';
import Hangeul from '@app/component/Main/FooterPages/Hangeul';

import 'primeicons/primeicons.css';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
    return (
        <div className="component-app">
            <div className="component-app-wrapper">
                <Navbar />
                <Routes>
                    <Route path="/tos" element={<Tos />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/hangeul" element={<Hangeul />} />
                    <Route path="/*" element={<HomePage />} />
                    <Route path="/learn" element={<Private component={DecksManager} />} />
                    <Route path="/mydecks" element={<Private component={CustomDecksManager} />} />
                    <Route path="/learn/quizz/:deckId" element={<Private component={QuizzApp} />} />
                    <Route path="/mydecks/quizz/:deckId" element={<Private component={QuizzApp} />} />
                    <Route path="/mydecks/edit/:deckId" element={<Private component={EditPage} />} />
                    <Route path="/register" element={<AlreadyLogged component={RegisterForm} />} />
                    <Route path="/login" element={<AlreadyLogged component={LoginForm} />} />
                    <Route path="/logout" element={<Private component={Logout} />} />
                    <Route path="/forgotpassword" element={<AlreadyLogged component={ForgotPassword} />} />
                    <Route path="/resetpassword/:token" element={<AlreadyLogged component={ResetPassword} />} />
                </Routes>
                <Footer />
            </div>
            <ToastContainer
                theme="dark"
                autoClose={2000}
                pauseOnFocusLoss={false}
                closeOnClick
                position="bottom-right"
            />
        </div>
    );
}