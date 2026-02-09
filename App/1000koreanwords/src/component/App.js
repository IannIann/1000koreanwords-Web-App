import React from 'react';
import QuizzApp from '@app/component/Quizz/QuizzApp';
import DecksManager from '@app/component/DecksManager/DecksManager';
import CustomDecksManager from '@app/component/DecksManager/CustomDecksManager';
import EditPage from '@app/component/DeckEdition/EditPage';
import HomePage from '@app/component/Main/HomePage';
import RegisterForm from '@app/component/Main/Authentification/RegisterForm';
import LoginForm from '@app/component/Main/Authentification/LoginForm';
import Logout from '@app/component/Main/Authentification/Logout';
import ForgotPassword from '@app/component/Main/Authentification/ForgotPassword';
import ResetPassword from '@app/component/Main/Authentification/ResetPassword';
import { AlreadyLogged, Private } from '@app/tool/customRoute'; //Private from '@app/tool/customRoute';
import Profile from '@app/component/Main/Profile/Profile';
import Navbar from '@app/component/Main/Navbar';
import Navbar_new from '@app/component/Main/Navbar_new';
import {Routes, Route} from 'react-router-dom'

import { ToastContainer } from 'react-toastify';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'react-toastify/dist/ReactToastify.css';

//test
import deck from "../test/deck";

export default class App extends React.Component {

    renderElement() {
        return (
            <>
                <Navbar_new />
                <Routes>
                    <Route path="/*" element={<HomePage/>}/>
                    <Route path="/learn" element={<Private component={DecksManager}/>}/>
                    <Route path="/mydecks" element={<Private component={CustomDecksManager}/>}/>
                    <Route path="/profile" element={<Private component={Profile}/>}/>
                    <Route path="/learn/quizz/:deckId" element={<Private component={QuizzApp}/>}/>
                    <Route path="/mydecks/quizz/:deckId" element={<Private component={QuizzApp}/>}/>
                    <Route path="/mydecks/edit/:deckId" element={<Private component={EditPage}/>}/>
                    <Route path="/register" element={<AlreadyLogged component={RegisterForm}/>}/>
                    <Route path="/login" element={<AlreadyLogged component={LoginForm}/>}/>
                    <Route path="/logout" element={<Private component={Logout}/>}/>
                    <Route path="/forgotpassword" element={<AlreadyLogged component={ForgotPassword}/>}/>
                    <Route path="/resetpassword/:token" element={<AlreadyLogged component={ResetPassword}/>}/>
                    <Route path="/test" element={<Private component={deck}/>}/>
                </Routes>

                <ToastContainer theme="dark" autoClose={2000} pauseOnFocusLoss={false} closeOnClick position='bottom-right'/>
                
            </>
        )
    }

    render() {
        return (
            <div className="component-app">
                {this.renderElement()}
            </div>
        )
    }
}   