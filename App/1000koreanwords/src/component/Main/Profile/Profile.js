import React from 'react';
import AuthService from '@app/service/auth.service'

export default class Profile extends React.Component {

    state = {
        currentUser: AuthService.getCurrentUser()
    };

    renderElement() {
        console.log(this.state.currentUser);
        return (
            <>
                <h1>Profile</h1>
                <div> Username: {this.state.currentUser.username} </div>
                <div> E-Mail: {this.state.currentUser.email} </div>
            </>
        )
    }

    render() {
        return (
            <div className="component-profile">
                {this.renderElement()}
            </div>
        )
    }
}