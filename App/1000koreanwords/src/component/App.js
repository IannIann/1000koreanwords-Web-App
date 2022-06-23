import React from 'react';
import QuizzApp from "./Quizz/QuizzApp";
import DecksTreeApp from './DecksTree/DecksTreeApp';
import HomePage from './Main/HomePage';
import RegisterForm from './Main/Register/RegisterForm';
import LoginForm from './Main/Login/LoginForm';
import CustomRoute from '../tool/customRoute';
import {Routes, Route} from 'react-router-dom'

export default class App extends React.Component {

    renderElement() {
        return (
            <Routes>
                <Route path="/*" element={<HomePage/>}/>
                <Route path="/learn" element={<CustomRoute.Private component={DecksTreeApp}/>}/>
                <Route path="/learn/quizz/:deckId" element={<CustomRoute.Private component={QuizzApp}/>}/>
                <Route path="/register" element={<CustomRoute.AlreadyLogged component={RegisterForm}/>}/>
                <Route path="/login" element={<CustomRoute.AlreadyLogged component={LoginForm}/>}/>
            </Routes>
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