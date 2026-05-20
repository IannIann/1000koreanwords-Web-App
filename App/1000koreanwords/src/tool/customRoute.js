import { Navigate } from 'react-router-dom';
import { useAuth } from '@app/tool/AuthContext';
import Loader from '@app/component/Main/Loader';


const AlreadyLogged = ({ component: Component }) => {
    const { isLogged } = useAuth();

    if (isLogged === null) return <Loader />;
    if (isLogged) return <Navigate to="/" />;

    return <Component />;
};


const Private = ({ component: Component }) => {
    const { isLogged } = useAuth();

    if (isLogged === null) return <Loader />;
    if (!isLogged) return <Navigate to="/" />;

    return <Component />;
};


export { Private, AlreadyLogged };
