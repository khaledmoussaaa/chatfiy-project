import React, { useState } from 'react'
import { images } from '../../../Constatnts/Images';
import { Button, Input, Textarea } from '@material-tailwind/react';
import { createPost } from '../../../Api/Posts/Posts';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    // Initial form state
    const initialFormState = {
        media: '',
        title: '',
        content: '',
    };

    const navigate = useNavigate();

    // States
    const [form, setForm] = useState(initialFormState);

    // Handle Change
    const handleChange = (e) => {
        if (e.target.name === 'media') {
            setForm({ ...form, media: e.target.files[0] });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    }

    // Create User
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost(form).then((response) => { setForm(initialFormState); navigate('/dashboard/posts') });
    };

    return (
        <div className='w-4/5 h-fit mx-auto p-5 overflow-hidden'>
            <div className='w-full h-full relative overflow-y-auto'>
                <form onSubmit={handleSubmit} className="realtive w-full mx-auto flex justify-center flex-col mt-5 p-5 gap-3 sm:gap-6">
                    <label htmlFor="imageupload" className='rounded-full w-40 h-40 relative overflow-hidden'>
                        <img src={form.media ? URL.createObjectURL(form.media) : images.profile} className="w-full h-full absolute object-cover" alt="media" />
                        <input id='imageupload' type="file" name='media' onChange={handleChange} className='hidden' />
                    </label>
                    <Input variant="static" label="Title" name='title' placeholder="Title" onChange={handleChange} />
                    <Textarea label="Content" name='content' onChange={handleChange} />

                    <Button type='submit' className='w-52 mx-auto' variant="gradient">Create</Button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost