import React from 'react';
import QuizzApp from '@app/component/Quizz/QuizzApp';
import DecksManager from '@app/component/DecksManager/DecksManager';
import CustomDecksManager from '@app/component/DecksManager/CustomDecksManager';
import EditPage from '@app/component/DeckEdition/EditPage';
import HomePage from '@app/component/Main/HomePage';
import RegisterForm from '@app/component/Main/Register/RegisterForm';
import LoginForm from '@app/component/Main/Login/LoginForm';
import Logout from '@app/component/Main/Login/Logout';
import CustomRoute from '@app/tool/customRoute';
import Profile from '@app/component/Main/Profile/Profile';
import Navbar from '@app/component/Main/Navbar';
import {Routes, Route} from 'react-router-dom'


import 'primeicons/primeicons.css';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'

//test
import deck from "../test/deck";

export default class App extends React.Component {

    renderElement() {
        return (
            <>
                <Navbar />
                <Routes>
                    <Route path="/*" element={<HomePage/>}/>
                    <Route path="/learn" element={<CustomRoute.Private component={DecksManager}/>}/>
                    <Route path="/mydecks" element={<CustomRoute.Private component={CustomDecksManager}/>}/>
                    <Route path="/profile" element={<CustomRoute.Private component={Profile}/>}/>
                    <Route path="/learn/quizz/:deckId" element={<CustomRoute.Private component={QuizzApp}/>}/>
                    <Route path="/mydecks/quizz/:deckId" element={<CustomRoute.Private component={QuizzApp}/>}/>
                    <Route path="/mydecks/edit/:deckId" element={<CustomRoute.Private component={EditPage}/>}/>
                    <Route path="/register" element={<CustomRoute.AlreadyLogged component={RegisterForm}/>}/>
                    <Route path="/login" element={<CustomRoute.AlreadyLogged component={LoginForm}/>}/>
                    <Route path="/logout" element={<CustomRoute.Private component={Logout}/>}/>
                    <Route path="/test" element={<CustomRoute.Private component={deck}/>}/>
                </Routes>
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