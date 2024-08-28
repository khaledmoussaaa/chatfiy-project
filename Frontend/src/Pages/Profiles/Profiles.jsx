import React, { useEffect, useState } from 'react';
import { Avatar, Button } from '@material-tailwind/react';
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { profileMe } from '../../Api/Profile/Profile';
import { addComment } from '../../Api/Posts/Posts';
import { getMedia } from '../../Api/Api';
import { images } from '../../Constatnts/Images';
import EditProfile from './EditProfile';

function Profiles() {
    const [profiles, setProfiles] = useState([]);
    const [comment, setComment] = useState('');
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        const getMe = async () => {
            try {
                const data = await profileMe();
                setProfiles(data.content); // Assigning profile data to profiles state
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        getMe();
    }, [update]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const addCommentPost = async (postId) => {
        try {
            await addComment(comment, postId);
            setUpdate(prev => prev + 1);
            setComment('');
        } catch (error) {
            console.error('Error commenting on post:', error);
        }
    };

    // Callback function to refresh posts
    const handlePostCreated = () => {
        setUpdate((prev) => prev + 1);
    };


    return (
        <div className='w-full h-full py-5'>
            <div className='w-[50%] mx-auto h-80 relative'>
                <img src='/src/assets/images/Background Profile.jpg' className='absolute w-full h-full object-cover rounded-3xl' alt="Background" />
                <img src={getMedia() ?? images.profile} className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 w-28 h-28 rounded-full object-cover' alt="Profile" />
                <EditProfile onProfileEdit={handlePostCreated} />
            </div>
            <div className='w-full h-full'>
                {profiles.map((post) => (
                    <div key={post.post_id} className="w-1/2 h-fit flex flex-col mt-6 text-gray-700 shadow-xl bg-clip-border rounded-xl mx-auto bg-white">
                        <div className='flex items-center'>
                            <Avatar src={post.user_media ?? images.profile} className='m-5' alt="avatar" size="lg" />
                            <div className='flex flex-col'>
                                <span className='text-lg font-semibold'>{post.user_name}</span>
                                <span>{post.created_at}</span>
                            </div>
                        </div>
                        <div className="relative w-4/5 h-full mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl mx-auto">
                            <img src={post.post_media} className="w-full h-full" alt="card-image" />
                        </div>
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                {post.title}
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                {post.content}
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="flex items-end justify-between p-6">
                                <div className="flex items-center -space-x-3 gap-4">
                                    <HandThumbUpIcon className={`h-5 w-5 cursor-pointer ${post.isLiked ? 'text-red-500' : ''}`} onClick={() => likeOrUnlikePost(post.post_id)} />
                                    <span>{post.total_likes && '+'}</span>
                                    {post.likes && post.likes.map((like, likeIndex) => (
                                        <div key={likeIndex}>
                                            <img alt="like-avatar" src={like.user_media} className="relative inline-block h-9 w-9 !rounded-full border-2 border-white object-cover object-center hover:z-10" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <div className='flex flex-col gap-2'>
                                <span>Comments</span>
                                {post.comments && post.comments.map((comment, commentIndex) => (
                                    <div key={commentIndex} className="border border-gray-200 p-3 rounded-lg mb-2">
                                        <div className="flex items-center mb-2">
                                            <Avatar src={comment.user_media} className="mr-2" alt="comment-avatar" size="sm" />
                                            <span className="text-sm font-semibold">{comment.user_name}</span>
                                        </div>
                                        <p className="text-sm">{comment.comment}</p>
                                    </div>
                                ))}
                                <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-200 bg-gray-100 p-1">
                                    <div className="relative grid h-full w-full min-w-[200px]">
                                        <textarea
                                            rows="1"
                                            placeholder="Your Message"
                                            className="peer h-full min-h-full w-full resize-y rounded-[7px] !border-0 border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:text-blue-gray-300 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-transparent focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                            value={comment}
                                            onChange={handleCommentChange}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            onClick={() => addCommentPost(post.post_id)}>
                                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M12.9576 7.71521C13.0903 7.6487 13.2019 7.54658 13.2799 7.42027C13.3579 7.29396 13.3992 7.14845 13.3992 7.00001C13.3992 6.85157 13.3579 6.70606 13.2799 6.57975C13.2019 6.45344 13.0903 6.35132 12.9576 6.28481L1.75762 0.68481C1.61875 0.615383 1.46266 0.587838 1.30839 0.605509C1.15412 0.623179 1.00801 0.685281 0.888948 0.783508C0.769888 0.881735 0.683237 1.01165 0.64189 1.15523C0.600542 1.2988 0.60612 1.44915 0.657315 1.58981L2.83095 7.00001L0.657315 12.4102C0.60612 12.5508 0.600542 12.7012 0.64189 12.8447C0.683237 12.9883 0.769888 13.1183 0.888948 13.2165C1.00801 13.3147 1.15412 13.3768 1.30839 13.3945C1.46266 13.4122 1.61875 13.3846 1.75762 13.3152L12.9576 7.71521Z"
                                                        fill="currentColor"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profiles;
