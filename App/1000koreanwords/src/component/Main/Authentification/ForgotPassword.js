import React from 'react';
import Input from '../Input';
import ButtonPushable from '@app/component/Buttons/ButtonPushable';
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
                <div className='form'>
                    <div className='form-title small'> Reset your password</div>
                    <form onSubmit={this.handleSubmit}>
                        <Input id="email" placeholder="Email" type="email" value={email} handler={this.handleChange} />
                        <ButtonPushable label="Send link" color="blue" size="small" />
                    </form>
                </div>
                )}

                {message && (
                    <div className='message-box'>
                        <div> {message} </div>
                        <br />
                        <br />
                        <div className='message-link'>Back to <Link to="/login/"> Login </Link></div>
                    </div>
                )}
            </>
        )
    }

    render() {
        return (
            <div className="component-forgot-password">
                {this.renderElement()}
            </div>
        );
    }
}

export default withRouter(ForgotPassword);