import React from 'react';
import Input from '@app/component/Main/Input';
import ButtonFlat from '@app/component/Buttons/ButtonFlat';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import AuthService from '@app/service/auth.service'
import { withRouter } from '@app/tool/withRouter'

import '@app/style/form.css';
class ForgotPassword extends React.Component {

    state = {
        email: "",
        message: "",
        successful: false
    };

    handleChange = e => {
        if (e.target.id === "email") {
            this.setState({
                email: e.target.value
            });
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        const { email } = this.state;

        if (!email || email.trim() === "") {
            return toast.error("Please enter your email address.");
        }

        AuthService.forgotPassword(
            this.state.email)
            .then((res) => {
                this.setState({
                    message: res.message,
                    successful: true
                })
            })
            .catch(() => {
                toast.error('Something went wrong.');
            });
    }

    renderElement() {
        const { email, message, successful } = this.state;
        return (
            <>
                {!successful && (
                <>
                    <div className='form-title small'> Forgot your password? </div>
                    <form onSubmit={this.handleSubmit}>
                        <Input id="email" placeholder="Email" type="email" value={email} handler={this.handleChange} />
                        <ButtonFlat label="Send Reset Link" customClass="button-form" />
                    </form>
                </>
                )}

                {message && (
                    <div className='message-box'>
                        <div> {message} </div>
                    </div>
                )}
            </>
        )
    }

    render() {
        return (
            <div className="component-forgot-password form">
                {this.renderElement()}
            </div>
        );
    }
}

export default withRouter(ForgotPassword);