import React from 'react';
import Input from '../Input';
import { toast } from 'react-toastify';
import AuthService from '@app/service/auth.service'
import { withRouter } from '@app/tool/withRouter'

class ForgotPassword extends React.Component {

    state = {
        email: "",
        message: "",
        successful: false
    };

    handleChange = e => {
        if (e.target.name === "email") {
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
                    <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Enter your email address</label>
                    <Input name="email" type="email" value={email} handler={this.handleChange} />

                    <input type="submit" value="Continue" />
                    
                </form>
                )}

                {message && (<div> {message} </div>)}
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