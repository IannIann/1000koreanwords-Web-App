import React from 'react';
import AuthService from '@app/service/auth.service'
import { withRouter } from '@app/tool/withRouter'

class Logout extends React.Component {

    logout() {
        AuthService.logout();
    }

    refresh() {
        window.location.reload();
    }

    handleLogoutClick = () =>
    {
        this.logout();
        this.refresh();
    }

    renderElement() {
        return (
            <button onClick={this.handleLogoutClick}>Logout</button>
        )
    }

    render() {
        return (
            <div className="component-logout">
                {this.renderElement()}
            </div>
        );
    }
}

export default withRouter(Logout);