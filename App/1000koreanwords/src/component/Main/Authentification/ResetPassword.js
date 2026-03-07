import React from 'react';
import Input from '../Input';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import AuthService from '@app/service/auth.service'
import { withRouter } from '@app/tool/withRouter'
import tool from '@app/tool/tool'

import '@app/style/form.css';

class ResetPassword extends React.Component {

    state = {
        password: "",
        passwordConfirm: "",
        isTokenValidated: false,
        message: "",
        errorMessage: "",
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
    }

    checkFormValidityAndSubmit = e => {
        const { password, passwordConfirm } = this.state;

         e.preventDefault();

        const passwordMatchCheck = tool.checkPasswordMatch(password, passwordConfirm);
        const passwordSecurityCheck = tool.checkPasswordSecurity(password);

        if (!passwordMatchCheck.success) {
            return this.setState({ errorMessage: passwordMatchCheck.message });
        }

        if (!passwordSecurityCheck.success) {
            return this.setState({ errorMessage: passwordSecurityCheck.message });
        }

        this.changePassword();
    };


    changePassword = () => {

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
        const {
            password,
            passwordConfirm,
            message,
            errorMessage,
            isTokenValidated: isValidToken,
        } = this.state;

        return (
            isValidToken && (
                <>
                    {!message && (
                        <>
                        <div className='form-title small'> Reset password</div>
                        <form onSubmit={this.checkFormValidityAndSubmit}>
                            <div className="form-input-container">
                                <Input
                                    id="password"
                                    placeholder="Enter new password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    handler={this.handleChange}
                                />
                                <Input
                                    id="password-confirm"
                                    placeholder="Confirm new password"
                                    type="password"
                                    value={passwordConfirm}
                                    handler={this.handleChange}
                                />
                            </div>

                            {errorMessage && (
                                <div className="error-message">
                                    {errorMessage}
                                </div>
                            )}

                            <ButtonFlat label="Save" customClass="button-form" />
                        </form>
                        </>
                    )}

                    {message && (
                        <div className="message-box">
                            <div>{message}</div>
                            <br />
                            <br />
                            <div className="message-link">
                                Back to <Link to="/login/"> Login </Link>
                            </div>
                        </div>
                    )}
                </>
            )
        )
    }

    render() {
        return (
            <div className="component-reset-password form">
                {this.renderElement()}
            </div>
        );
    }
}

export default withRouter(ResetPassword);