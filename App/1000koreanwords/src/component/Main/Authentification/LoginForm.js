import React from 'react';
import Input from '@app/component/Main/Input';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import AuthService from '@app/service/auth.service';
import { Link } from 'react-router-dom';
import tool from '@app/tool/tool';
import { withRouter } from '@app/tool/withRouter'

import '@app/style/form.css';

class LoginForm extends React.Component {

    state = {
        username: '',
        password: '',
        message: ''
    };

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleLogin = e => {
        e.preventDefault();

        const { username, password } = this.state;

        AuthService.login(username, password)
            .then(() => {
                this.props.router.navigate('/learn');
            })
            .catch((error) => {
                this.setState({ message: tool.getErrorMessage(error) });
            });
    }

    renderElement() {
        const { username, password, message } = this.state;
        return (
            <>
                <div className="form-title">Login</div>
                <form onSubmit={this.handleLogin}>
                    <Input id="username" placeholder="Username" type="text" value={username} handler={this.handleChange} />
                    <Input id="password" placeholder="Password" type="password" value={password} handler={this.handleChange} />
                    {message && <div className="error-message">{message}</div>}

                    <ButtonFlat label="Sign in" customClass="button-form" />

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