
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Crud from './components/Crud';
import ProtectedRoute from './components/ProtectedRoute';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Main />
            </Router>
        </AuthProvider>
    );
};


const Main = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <>
            {!isLoginPage && <Navbar />}
            <ThemeToggle />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Crud />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
