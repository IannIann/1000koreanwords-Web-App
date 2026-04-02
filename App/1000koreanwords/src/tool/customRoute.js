import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '@app/service/auth.service';
import Loader from '@app/component/Main/Loader';


function useAuthCheck() {
    const [isLogged, setIsLogged] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await AuthService.checkAuthToken();
                setIsLogged(res.valid);
            } catch {
                setIsLogged(false);
            }
        };

        checkAuth();
    }, []);

    return isLogged;
}


const AlreadyLogged = ({ component: Component }) => {
    const isLogged = useAuthCheck();

    if (isLogged === null) return <Loader />;
    if (isLogged) return <Navigate to="/" />;

    return <Component />;
};


const Private = ({ component: Component }) => {
    const isLogged = useAuthCheck();

    if (isLogged === null) return <Loader />;
    if (!isLogged) return <Navigate to="/" />;

    return <Component />;
};


export { Private, AlreadyLogged };