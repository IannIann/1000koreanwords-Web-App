import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '@app/component/Main/Input';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import AuthService from '@app/service/auth.service';
import { withRouter } from '@app/tool/withRouter';
import tool from '@app/tool/tool';
import '@app/style/form.css';

class ResetPassword extends React.Component {

    state = {
        password: '',
        passwordConfirm: '',
        isTokenValidated: false,
        message: '',
        errorMessage: '',
    };

    componentDidMount() {
        const { token } = this.props.router.params;
        this.validateResetToken(token);
    }

    validateResetToken(token) {
        AuthService.validateResetToken(token)
            .then((res) => {
                if (res.valid) {
                    this.setState({ isTokenValidated: true });
                } else {
                    this.props.router.navigate('/');
                }
            })
            .catch(() => {
                toast.error('Oops! Something went wrong...');
            });
    }

    handleChange = e => {
        const key = e.target.id === 'password-confirm' ? 'passwordConfirm' : e.target.id;
        this.setState({ [key]: e.target.value });
    }

    checkFormValidityAndSubmit = e => {
        e.preventDefault();
        const { password, passwordConfirm } = this.state;
        const matchCheck = tool.checkPasswordMatch(password, passwordConfirm);
        const securityCheck = tool.checkPasswordSecurity(password);

        if (!matchCheck.success) return this.setState({ errorMessage: matchCheck.message });
        if (!securityCheck.success) return this.setState({ errorMessage: securityCheck.message });

        this.changePassword();
    };

    changePassword = () => {
        const { token } = this.props.router.params;
        AuthService.resetPassword(token, this.state.password)
            .then((res) => {
                this.setState({ message: res.message });
            })
            .catch(() => {
                toast.error('Oops! Something went wrong...');
            });
    }

    renderElement() {
        const { password, passwordConfirm, message, errorMessage, isTokenValidated } = this.state;

        return (
            isTokenValidated && (
                <>
                    {!message && (
                        <>
                            <div className="form-title small">Reset password</div>
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
                                    <div className="error-message">{errorMessage}</div>
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
        );
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