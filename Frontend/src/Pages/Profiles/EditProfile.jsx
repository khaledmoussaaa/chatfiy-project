import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { profileEdit, profileUpdate } from "../../Api/Profile/Profile";
import { getUserId } from "../../Api/Api";
import { images } from "../../Constatnts/Images";

function EditProfile({ onProfileEdit }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const initialFormState = {
        media: '',
        name: '',
        email: '',
        phone: '',
    };

    // States
    const [form, setForm] = useState(initialFormState);

    // Handle Change
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'media') {
            if (files.length === 0) {
                // Remove media from form if no file is selected
                setForm({ ...form, media: '' });
            } else {
                setForm({ ...form, media: files[0] });
            }
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (const key in form) {
            if (form[key]) {
                formData.append(key, form[key]);
            }
        }

        try {
            await profileUpdate(getUserId(), formData);
            setForm(initialFormState);

            onProfileEdit();  // Callback to refresh profile data
            handleOpen(); // Close the modal
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    // Fetch current user profile data
    useEffect(() => {
        const getMe = async () => {
            try {
                const data = await profileEdit();
                setForm({
                    ...form,
                    media: data.media ? data.media.original_url : '',  // Assuming media is a URL
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        getMe();
    }, []);

    return (
        <div className="absolute right-0 m-5 mx-10">
            <Button onClick={handleOpen}>Edit Profile</Button>
            <Dialog open={open} size="xs" handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Edit Profile</DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5 cursor-pointer"
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
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="flex items-center justify-center">
                            <label htmlFor="imageupload" className="relative rounded-full overflow-hidden w-40 h-40">
                                <Avatar
                                    src={form.media instanceof File ? URL.createObjectURL(form.media) : form.media || images.profile}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                                <input
                                    id="imageupload"
                                    type="file"
                                    name="media"
                                    onChange={handleChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        <Input
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <Input
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <Input
                            label="Phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </form>
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

export default EditProfile;