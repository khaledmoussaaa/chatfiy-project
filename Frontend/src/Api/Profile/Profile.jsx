import axiosInstance from "../Api";

// -------- Constant Apis For Users -------- //
// Fetches Users
export const profileMe = async () => {
    try {
        const response = await axiosInstance.get('profile/me');
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};
export const profileEdit= async () => {
    try {
        const response = await axiosInstance.get('auth/me');
        return response.data.content;
    }
    catch (error) {
        console.log(error);
    }
};
export const profileUpdate= async (id, form) => {
    try {
        const response = await axiosInstance.post(`profile/edit/${id}`,form);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};

