import axiosInstance from "../Api";

// -------- Constant Vraibles -------- //
const prefix = 'posts'

// -------- Constant Apis For Users -------- //
// Fetches Users
export const friendsPosts = async () => {
    try {
        const response = await axiosInstance.get('/posts-friends');
        console.log(response);

        return response.data.content;
    }
    catch (error) {
        console.log(error);
    }
};

// Create User
export const createPost = async (form) => {
    try {
        const response = await axiosInstance.post(prefix, form);
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

