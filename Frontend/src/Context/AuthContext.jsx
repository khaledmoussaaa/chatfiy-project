// AuthProvider.js

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { deleteToken, setToken } from "../Api/Api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    // Clear errors when the component mounts or the user changes routes
    useEffect(() => {
        setErrors({});
    }, [navigate]);

    // Function to get user details
    const getUser = async () => {
        try {
            const response = await axiosInstance.post('auth/me');
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to handle login
    const login = async (data) => {
        setErrors({});
        try {
            const response = await axiosInstance.post('auth/login', data);
            setToken(response.data.token, response.data.user_id, response.data.media && response.data.media.original_url)
            setSuccess(true);
            setErrors({});
            setloading(true)
            navigate('/timeline/posts');
        } catch (error) {
            handleAuthError(error);
            setloading(false)
        }
    };

    // Function to handle registration
    const register = async (data) => {
        console.log('data', data);

        try {
            const response = await axiosInstance.post('auth/register', data);
            setToken(response.data.token, response.data.user_id, response.data.media && response.data.media.original_url)
            setSuccess(true);
            setErrors({});
            setloading(true)
            navigate('/timeline/posts');
        } catch (error) {
            handleAuthError(error);
            setloading(false)
        }
    };

    // Function to handle logout
    const logout = async () => {
        try {
            await axiosInstance.post('auth/logout');
            deleteToken();
            setUser(null); // Clear user state on logout
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    // Function to handle authentication errors
    const handleAuthError = (error) => {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 422) {
                setErrors(data.errors);
            } else if (status === 401 || status === 429) {
                setErrors({ message: data.errors });
            } else {
                setErrors({ message: "An unexpected error occurred." });
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, errors, success, getUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuthContext() {
    return useContext(AuthContext);
}
