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

