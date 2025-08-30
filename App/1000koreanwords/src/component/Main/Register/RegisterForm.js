import React from 'react';
import Input from '../Input';
import AuthService from '@app/service/auth.service'
import customdecksData from '@app/data/customdecks.data';
import {getErrorMessage} from '@app/tool/tool'
import {withRouter} from '@app/tool/withRouter'

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
        if (e.target.name === "email") {
            this.setState({
                email: e.target.value
            });
        }

        if (e.target.name === "username") {
            this.setState({
                username: e.target.value
            });
        }

        if (e.target.name === "password") {
            this.setState({
                password: e.target.value
            });
        }

        if (e.target.name === "password-confirm") {
            this.setState({
                passwordConfirm: e.target.value
            });

            if (this.state.password != e.target.value) {
                e.target.setCustomValidity("Password doesn't match");
            } else {
                e.target.setCustomValidity("");
            }
        }
    };

    handleRegister = e => {
        e.preventDefault();

        AuthService.register(
            this.state.username,
            this.state.email,
            this.state.password)
            .then((res) => {
                this.setState({
                    message: res.message,
                    successful: true
                })

                this.createDefaultCustomDeck();

            })
            .catch((error) => {
                this.setState({
                    message: getErrorMessage(error),
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
            <form onSubmit={this.handleRegister}>
                {!successful && (
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input name="email" type="email" value={email} handler={this.handleChange} />

                        <label htmlFor="username">Username</label>
                        <Input name="username" type="text" value={username} handler={this.handleChange} />

                        <label htmlFor="password">Password</label>
                        <Input id="password" name="password" type="password" value={password} handler={this.handleChange} />

                        <label htmlFor="password-confirm">Confirm password</label>
                        <Input name="password-confirm" type="password" value={passwordConfirm} handler={this.handleChange} />

                        <input type="submit" value="Register" />
                    </div>
                )}

                {message && (<div> {message} </div>)}

            </form>
        )
    }

    render() {
        return (
            <div className="component-register">
                {this.renderElement()}
            </div>
        );
    }
}

export default withRouter(RegisterForm);