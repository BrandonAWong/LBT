import { createContext, useContext, useEffect, useState } from 'react';
import API_BASE_URL from '../config/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const login = async () => {
            const response = await fetch(`${API_BASE_URL}/login`);
            if (response.ok) {
                const json = await response.json()
                setUser(json);
            }
        };

        login();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);