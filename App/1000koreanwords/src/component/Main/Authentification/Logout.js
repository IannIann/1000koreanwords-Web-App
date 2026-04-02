import React from 'react';
import AuthService from '@app/service/auth.service'
import { withRouter } from '@app/tool/withRouter'

class Logout extends React.Component {

    logout = () => {
        AuthService.logout().then(() => {
            window.location.reload();
        });
    }

    renderElement() {
        return this.logout();
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