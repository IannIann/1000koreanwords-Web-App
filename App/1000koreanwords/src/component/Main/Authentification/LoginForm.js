import React from 'react';
import Input from '../Input';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import AuthService from '@app/service/auth.service'
import { Link } from "react-router-dom";
import tool from '@app/tool/tool'
import { withRouter } from '@app/tool/withRouter'

import '@app/style/form.css';

class LoginForm extends React.Component {

    state = {
        username: "",
        password: "",
        message: ""
    };

    handleChange = e => {
        if (e.target.id === "username") {
            this.setState({
                username: e.target.value
            });
        }

        if (e.target.id === "password") {
            this.setState({
                password: e.target.value
            });
        }
    }

    handleLogin = e => {
        const { username, password } = this.state;

        e.preventDefault();

        AuthService.login(
            username,
            password)
            .then(() => {
                this.navigateToLearnPage();
            })
            .catch((error) => {
                this.setState({
                    message: tool.getErrorMessage(error)
                })
            })
    }

    navigateToLearnPage = () => {
        this.props.router.navigate('/learn');
    }

    renderElement() {
        const { username, password, message } = this.state;
        return (
            <>
                <div className='form-title'>Login</div>
                <form onSubmit={this.handleLogin}>
                    <Input id="username" placeholder="Username" type="text" value={username} handler={this.handleChange} />
                    <Input id="password" placeholder="Password" type="password" value={password} handler={this.handleChange} />
                    {message && (<div className="error-message"> {message} </div>)}

                    <ButtonFlat label="Sign in" color="blue" customClass="button-form" />

                </form>

                <div className="footer">
                    <div className="forgot-password">
                        <Link to="/forgotpassword/">Forgot password?</Link>
                    </div>

                    <div className="register">
                        Don't have an account? <Link to="/register/"> Create one. </Link>
                    </div>
                </div>
            </>
        )
    }

    render() {
        return (
            <div className="component-login form">
                {this.renderElement()}
            </div>
        );
    }
}

export default withRouter(LoginForm);