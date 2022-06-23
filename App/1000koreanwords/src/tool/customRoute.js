import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '@app/service/auth.service'

export default
    {
        Private({ component: Component, ...rest }) {

            const isLogged = AuthService.getCurrentUser();
            return isLogged ? <Component /> : <Navigate to="/" />;
        },

        AlreadyLogged({ component: Component, ...rest }) {

            const isLogged = AuthService.getCurrentUser();
            return !isLogged ? <Component /> : <Navigate to="/" />;
        }
    }