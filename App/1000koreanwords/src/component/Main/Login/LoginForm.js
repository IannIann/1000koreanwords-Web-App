import React from 'react';
import Input from '../Input';
import AuthService from '@app/service/auth.service'
import { getErrorMessage } from '@app/tool/tool'
import { withRouter } from '@app/tool/withRouter'

class LoginForm extends React.Component {

    state = {
        username: "",
        password: "",
        successful: false,
        message: ""
    };

    handleChange = e => {
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
    }

    handleLogin = e => {
        e.preventDefault();

        AuthService.login(
            this.state.username,
            this.state.password)
            .then(() => {
                this.setState({
                    successful: true
                })

                this.navigateToMainPage();
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

    renderElement() {
        const { username, password, message } = this.state;
        return (
            <form onSubmit={this.handleLogin}>
                <label htmlFor="username">Username</label>
                <Input name="username" type="text" value={username} handler={this.handleChange} />

                <label htmlFor="password">Password</label>
                <Input id="password" name="password" type="password" value={password} handler={this.handleChange} />
            <input type="submit" value="Login" />

            {message && (<div> {message} </div>)}
            </form>
        )
    }

    render() {
        return (
            <div className="component-login">
                {this.renderElement()}
            </div>
        );
    }
}

export default withRouter(LoginForm);