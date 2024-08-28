import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { createPost } from "../../Api/Posts/Posts";
import { images } from "../../Constatnts/Images";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost({ onPostCreated }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const initialFormState = {
        media: '',
        title: '',
        content: '',
    };

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

        // Create a copy of the form data
        const formData = { ...form };

        // If media is empty, delete the media key from formData
        if (!formData.media) {
            delete formData.media;
        }

        await createPost(formData).then((response) => {
            setForm(initialFormState);
            onPostCreated();  // Call the callback function
            handleOpen();
        });
    };

    return (
        <div className="absolute right-0 m-5 mx-10">
            <Button onClick={handleOpen}>Add New Post</Button>
            <Dialog open={open} size="xs" handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        {" "}
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                        onClick={handleOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody>
                    <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
                        Create New Post
                    </Typography>
                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit} className="relative w-full flex items-center justify-center flex-col mt-5 p-5 gap-3 sm:gap-6 ">
                            <label htmlFor="imageupload" className='rounded-full w-40 h-40 relative overflow-hidden'>
                                <img src={form.media ? URL.createObjectURL(form.media) : images.profile} className="w-full h-full absolute object-cover" alt="media" />
                                <input id='imageupload' type="file" name='media' onChange={handleChange} className='hidden' />
                            </label>

                            <Input label="Title" name='title' onChange={handleChange} />
                            <Textarea label="Content" name='content' onChange={handleChange} />
                        </form>
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        Cancel
                    </Button>
                    <Button variant="gradient" color="gray" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
export default CreatePost;