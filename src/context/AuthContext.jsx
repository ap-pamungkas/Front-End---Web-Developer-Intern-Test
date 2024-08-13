import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) || null;
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const login = (username, password) => {
        if (username === 'testuser' && password === 'password') {
            setUser({ username });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Function to update the username
    const updateUsername = (newUsername) => {
        setUser(prevUser => {
            if (prevUser) {
                const updatedUser = { ...prevUser, username: newUsername };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                return updatedUser;
            }
            return prevUser;
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
