import { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '@app/service/auth.service';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isLogged, setIsLogged] = useState(null);

    useEffect(() => {
        AuthService.checkAuthToken()
            .then(res => setIsLogged(res.valid))
            .catch(() => setIsLogged(false));
    }, []);

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContext;
