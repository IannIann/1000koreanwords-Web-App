import React from 'react';
import QuizzApp from "./Quizz/QuizzApp";
import DecksTreeApp from './DecksTree/DecksTreeApp';
import CustomDecksTreeApp from './CustomDecksTree/CustomDecksTreeApp';
import HomePage from './Main/HomePage';
import RegisterForm from './Main/Register/RegisterForm';
import LoginForm from './Main/Login/LoginForm';
import Logout from './Main/Login/Logout';
import CustomRoute from '../tool/customRoute';
import Profile from './Main/Profile/Profile';
import {Routes, Route} from 'react-router-dom'

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'


//test
import Navbar from './Main/Navbar';

export default class App extends React.Component {

    renderElement() {
        return (
            <>
                <Navbar />
                <Routes>
                    <Route path="/*" element={<HomePage/>}/>
                    <Route path="/learn" element={<CustomRoute.Private component={DecksTreeApp}/>}/>
                    <Route path="/mydecks" element={<CustomRoute.Private component={CustomDecksTreeApp}/>}/>
                    <Route path="/profile" element={<CustomRoute.Private component={Profile}/>}/>
                    <Route path="/learn/quizz/:deckId" element={<CustomRoute.Private component={QuizzApp}/>}/>
                    <Route path="/register" element={<CustomRoute.AlreadyLogged component={RegisterForm}/>}/>
                    <Route path="/login" element={<CustomRoute.AlreadyLogged component={LoginForm}/>}/>
                    <Route path="/logout" element={<CustomRoute.Private component={Logout}/>}/>
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