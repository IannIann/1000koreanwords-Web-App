import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '@app/service/auth.service'
import Loader from '@app/component/Main/Loader';

const AlreadyLogged = ({ component: Component, ...rest }) => {
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
      AuthService.checkAuthToken().then((res) => {
          setIsLogged(res.valid);
      })
          .catch(() => {
              setIsLogged(false);
          });
  }, []);

  if (isLogged === null) {
    return <Loader/>;
  }

    if (!isLogged) {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
};

const Private = ({ component: Component, ...rest }) => {
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
      AuthService.checkAuthToken().then((res) => {
          setIsLogged(res.valid);
      })
          .catch(() => {
              setIsLogged(false);
          });
  }, []);

  if (isLogged === null) {
    return <Loader/>;
  }

  if (isLogged) {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
};

export { Private, AlreadyLogged };