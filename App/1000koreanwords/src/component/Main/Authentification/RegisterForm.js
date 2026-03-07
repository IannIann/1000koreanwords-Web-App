import React from 'react';
import Input from '../Input';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import AuthService from '@app/service/auth.service'
import customdecksData from '@app/data/customdecks.data';
import tool from '@app/tool/tool'
import { withRouter } from '@app/tool/withRouter'

import '@app/style/form.css';

class RegisterForm extends React.Component {

    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        successful: false,
        message: ""
    };

    handleChange = e => {
        if (e.target.id === "email") {
            this.setState({
                email: e.target.value
            });
        }

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

        if (e.target.id === "password-confirm") {
            this.setState({
                passwordConfirm: e.target.value
            });
        }
    };

    checkFormValidityAndSubmit = e => {
        const { email, username, password, passwordConfirm } = this.state;

        e.preventDefault();

        const emailCheck = tool.checkEmailFormat(email);
        const usernameCheck = tool.checkUsernameFormat(username);
        const passwordMatchCheck = tool.checkPasswordMatch(password, passwordConfirm);
        const passwordSecurityCheck = tool.checkPasswordSecurity(password);

        if (!emailCheck.success) {
            return this.setState({ message: emailCheck.message });
        }

        if (!usernameCheck.success) {
            return this.setState({ message: usernameCheck.message });
        }

        if (!passwordMatchCheck.success) {
            return this.setState({ message: passwordMatchCheck.message });
        }

        if (!passwordSecurityCheck.success) {
            return this.setState({ message: passwordSecurityCheck.message });
        }
        
        this.register();
    };

    register = () => {
        const { email, username, password } = this.state;

        AuthService.register(
            username,
            email,
            password)
            .then((res) => {
                this.setState({
                    message: res.message,
                    successful: true
                })

                this.createDefaultCustomDeck();

            })
            .catch((error) => {
                this.setState({
                    message: tool.getErrorMessage(error),
                    successful: false
                })
            })
    }

    navigateToMainPage = () => {
        window.location.reload();
    }

    createDefaultCustomDeck = () => {
        customdecksData.createCustomDeck("Custom Deck")
            .then(() => {
                this.navigateToMainPage();
            })
            .catch(() => {
                this.navigateToMainPage();
            });
    }

    renderElement() {
        const { email, username, password, passwordConfirm, successful, message } = this.state;
        return (
            <>
                <div className='form-title'>Sign up</div>
                <form onSubmit={this.checkFormValidityAndSubmit}>
                    {!successful && (
                        <div>
                            <Input id="email" placeholder="Email" type="email" value={email} handler={this.handleChange} />
                            <Input id="username" placeholder="Username" type="text" value={username} handler={this.handleChange} />
                            <Input id="password" placeholder="Password" name="password" type="password" value={password} handler={this.handleChange} />
                            <Input id="password-confirm" placeholder="Confirm password" type="password" value={passwordConfirm} handler={this.handleChange} />
                            {message && (<div className="error-message"> {message} </div>)}
                            <ButtonFlat label="Register" customClass="button-form"/>
                        </div>
                    )}
                </form>
            </>
        )
    }

    render() {
        return (
            <div className="component-register form">
                {this.renderElement()}
            </div>
        );
    }
}

export default withRouter(RegisterForm);