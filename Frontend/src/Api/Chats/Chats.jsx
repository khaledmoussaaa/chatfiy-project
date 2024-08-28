import axiosInstance from "../Api";

// -------- Constant Apis For Users -------- //
// Fetches Users
export const chatsUsers = async () => {
    try {
        const response = await axiosInstance.get('/chats');
        return response.data.content;
    }
    catch (error) {
        console.log(error);
    }
};

// Messages Between Users
export const messagesUsers = async (chat_id) => {
    try {
        const response = await axiosInstance.get(`messages/${chat_id}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};

// Messages Between Users
export const sendMessage = async (chat_id, message) => {
    
    try {
        const response = await axiosInstance.post('messages', {chat_id, message});
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};


// Get Friends For User
export const getFriends = async () => {
    
    try {
        const response = await axiosInstance.get('get/friends/accepted');
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};

// Add New Chat
export const newChat = async (user_id) => {
    try {
        const response = await axiosInstance.post('chats', {user_id});
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};


// // Edit User
// export const editUser = async (id) => {
//     try {
//         const response = await axiosInstance.get(`${prefix}/${id}`);
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// };

// // Updated User
// export const updateUser = async (id, form) => {
//     try {
//         const response = await axiosInstance.post(`${prefix}/${id}`, form);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating user:', error);
//         throw error;
//     }
// };

// // Deleted User
// export const deleteUser = async (id) => {
//     try {
//         const response = await axiosInstance.delete(`${prefix}/${id}`);
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// };

// Deleted User
export const likeOrUnlike = async (post_id) => {
    console.log("post_id", post_id);

    try {
        const response = await axiosInstance.post('/posts-like', { post_id });
        return response;
    } catch (error) {
        console.log(error);
    }
};
// Deleted User
export const addComment = async (comment, post_id) => {
    try {
        const response = await axiosInstance.post('/posts-comment', { comment, post_id });
        return response;
    } catch (error) {
        console.log(error);
    }
};

