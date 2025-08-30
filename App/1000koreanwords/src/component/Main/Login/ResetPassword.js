import React from 'react';
import Input from '../Input';
import { toast } from 'react-toastify';
import AuthService from '@app/service/auth.service'
import { withRouter } from '@app/tool/withRouter'

class ResetPassword extends React.Component {

    state = {
        password: "",
        passwordConfirm: "",
        successful: false,
        isTokenValidated: false,
        message: "",
        token: null
    };

    componentDidMount() {
        const { token } = this.props.router.params;
        this.validateResetToken(token);
    }

    validateResetToken(token) {
        AuthService.validateResetToken(token)
            .then((res) => {
                if (res.valid) {
                    this.setState({ isTokenValidated: res.valid });
                } else {
                    this.props.router.navigate("/");
                }
            })
            .catch(() => {
                  toast.error('Something went wrong.');
            })
    }

    handleChange = e => {
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
    }

    handleSubmit = e => {
        e.preventDefault();

        const { token } = this.props.router.params;

        AuthService.resetPassword(
            token,
            this.state.password)
            .then((res) => {
                this.setState({
                    message: res.message,
                })
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
    }

    renderElement() {
        const { password, passwordConfirm, message, isTokenValidated } = this.state;
        return (
            isTokenValidated &&
            (<>
                {!message && (<form onSubmit={this.handleSubmit}>
                    <label htmlFor="password">New password</label>
                    <Input id="password" name="password" type="password" value={password} handler={this.handleChange} />

                    <label htmlFor="password-confirm">Confirm new password</label>
                    <Input name="password-confirm" type="password" value={passwordConfirm} handler={this.handleChange} />

                    <input type="submit" value="Confirm" />
                </form>)}

                {message && (<div> {message} </div>)}
            </>)
        )
    }

    render() {
        return (
            <div className="component-reset-password">
                {this.renderElement()}
            </div>
        );
    }
}

export default withRouter(ResetPassword);