import React from 'react';
import Input from '../Input';
import AuthService from '@app/service/auth.service'
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
        setTimeout(() => {this.props.router.navigate("/learn")}, 3000);
    }

    renderElement() {
        return (
            <form onSubmit={this.handleRegister}>
                {!this.state.successful && (
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input name="email" type="email" value={this.state.email} handler={this.handleChange} />

                        <label htmlFor="username">Username</label>
                        <Input name="username" type="text" value={this.state.username} handler={this.handleChange} />

                        <label htmlFor="password">Password</label>
                        <Input id="password" name="password" type="password" value={this.state.password} handler={this.handleChange} />

                        <label htmlFor="password-confirm">Confirm password</label>
                        <Input name="password-confirm" type="password" value={this.state.passwordConfirm} handler={this.handleChange} />

                        <input type="submit" value="Register" />
                    </div>
                )}

                {this.state.message && (<div> {this.state.message} </div>)}
                
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