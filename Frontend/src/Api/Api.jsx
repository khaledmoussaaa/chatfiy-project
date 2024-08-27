// ---------- Import ---------- //
import axios from "axios";
import Cookies from "universal-cookie";

// ---------- Const Variables ---------- //
const baseURL = 'http://127.0.0.1:8000/api/';
const cookie = new Cookies();

// ---------- Functions ---------- //
// Set Token
export const setToken = (token, user_id, media) => {
    cookie.set('token', token, { path: '/' });
    cookie.set('user_id', user_id, { path: '/' });
    cookie.set('media', media, { path: '/' });
};
// Get Token
const getToken = () => {
    return cookie.get('token');
};
// Get User ID
export const getUserId = () => {
    return cookie.get('user_id');
};
// Get User ID
export const getMedia = () => {
    return cookie.get('media');
};
// Delete Token
export const deleteToken = () => {
    cookie.remove('token', { path: '/' });
    cookie.remove('user_id', { path: '/' });
    localStorage.clear();
    sessionStorage.clear();
};

// Instance From Axios
const axiosInstance = axios.create({
    baseURL: baseURL,
});

// Axios Interceptors Request
axiosInstance.interceptors.request.use(
    async config => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.Accept = 'application/json';
        }
        config.headers["Content-Type"] = 'multipart/form-data'
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Axios Interceptors Response
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const token = getToken();

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Send the current token in the Authorization header for the refresh request
                const response = await axiosInstance.post('auth/refresh');

                // Save new tokens
                setToken(response.data.token);

                originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

                // Update the authorization header and retry the original request
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                console.log(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;