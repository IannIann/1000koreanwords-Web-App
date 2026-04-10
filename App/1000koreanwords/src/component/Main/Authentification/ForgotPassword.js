import React from 'react';
import Input from '@app/component/Main/Input';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import { toast } from 'react-toastify';
import AuthService from '@app/service/auth.service';
import tool from '@app/tool/tool';
import { withRouter } from '@app/tool/withRouter';

import '@app/style/form.css';

class ForgotPassword extends React.Component {

    state = {
        email: '',
        message: '',
        errorMessage: '',
        successful: false
    };

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();

        const { email } = this.state;

        if (!email || email.trim() === '') {
            return toast.error('Please enter your email address.');
        }

        AuthService.forgotPassword(email)
            .then(res => {
                this.setState({ message: res.message, successful: true });
            })
            .catch((error) => {
                this.setState({ errorMessage: tool.getErrorMessage(error) });
            });
    }

    render() {
        const { email, message, errorMessage, successful } = this.state;

        return (
            <div className="component-forgot-password form">
                {!successful && (
                    <>
                        <div className="form-title small">Forgot your password?</div>
                        <form onSubmit={this.handleSubmit}>
                            <Input id="email" placeholder="Email" type="email" value={email} handler={this.handleChange} />
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            
                            <ButtonFlat label="Send Reset Link" customClass="button-form" />
                        </form>
                    </>
                )}
                {message && (
                    <div className="message-box">
                        <div>{message}</div>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(ForgotPassword);