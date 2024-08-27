import axiosInstance from "../Api";

// Fetches Friends
export const myFriends = async (status) => {
    try {
        const response = await axiosInstance.get(`/get/friends/${status}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Add Or Accept Friends
export const addOrAccept = async (friend_id, status) => {
    console.log('sssssssssssss',friend_id, status);
    
    try {
        const response = await axiosInstance.post('/add/friends', { friend_id, status });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


