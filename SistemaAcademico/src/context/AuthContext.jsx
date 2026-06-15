import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { token };
        }
        return null;
    });
    const [loading] = useState(false);

    const login = async (email, password) => {
        const response = await axios.post('/api/auth/login', { email, password });

        const { token } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser({ token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export the provider as the default export to keep this file exporting only a component
export default AuthProvider;

// Also attach the context to the provider so other modules can access it without a separate named export
AuthProvider.Context = AuthContext;