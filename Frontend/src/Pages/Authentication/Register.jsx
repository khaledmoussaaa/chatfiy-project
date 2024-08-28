import { useState } from "react"
import { Logo, Header, Submit, ErrorMessage, InputClass, Background } from "../../Components/Auth Component/Imports";
import useAuthContext from "../../Context/AuthContext";
import { inputFields } from "../../Constatnts/InputsFields";
import { images } from "../../Constatnts/Images";
function Register() {
    // Initial form state
    const initialFormState = {
        media: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
    };
    // States
    const [form, setForm] = useState(initialFormState);

    // Context
    const { register, loading, success, errors } = useAuthContext();


    // Handle Change
    const handleChange = (e) => {
        if (e.target.name === 'media') {
            setForm({ ...form, media: e.target.files[0] });

        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    }

    // handle form submit
    const handleSubmit = (e) => {
        const formData = { ...form };

        if (!formData.media) {
            delete formData.media;
        }
        
        e.preventDefault();
        register(formData).then((response) => { setForm(initialFormState), console.log(response); });
    };


    return (
        <div className="w-full h-screen p-5 flex justify-center items-center relative overflow-auto bg-[#f4f7fe]">

            {/* Container Form */}
            <div className="w-[95%] h-fit sm:w-2/3 flex justify-between bg-white rounded-2xl shadow-lg shadow-slate-200">

                {/* Form */}
                <div className="w-full h-full xl:w-1/2">

                    {/* Logo */}
                    <Logo />

                    {/* Header */}
                    <Header header="Hi There" subheader="Create Account, Please enter your details." />

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="w-full h-full mx-auto flex justify-center flex-col mt-5 gap-3 sm:gap-6 overflow-y-auto">
                        <label htmlFor="imageupload" className='mx-auto rounded-full w-40 h-40 relative overflow-hidden'>
                            <img src={form.media ? URL.createObjectURL(form.media) : images.profile} className="w-full h-full absolute object-cover" name='media' alt="" />
                            <input id='imageupload' type="file" name='media' onChange={handleChange} className='hidden' />
                        </label>

                        <div className="w-full flex flex-col gap-3 sm:gap-6 p-2">
                            {/* Inputs */}
                            {inputFields.map((input, index) => (
                                <div className="relative" key={index}>
                                    <input key={index} type={input.type} name={input.name} value={form[input.name]} placeholder={input.placeholder} autoComplete={input.autoComplete} onChange={handleChange} className='p-3 border-b w-full    ' />
                                    <ErrorMessage error={errors[input.name]} />
                                </div>
                            ))}

                        </div>
                        {/* Message Error */}
                        {errors.message && <span className="text-red-500 absolute bottom-7 text-center">{errors.message}</span>}

                        {/* Submit */}
                        <Submit buttonName="Submit" loading={loading} title="Don you hove on account?" sign="Sign In" navigate="/login" />
                    </form>

                </div>

                {/* Background */}
                <Background path="Background.png" />
            </div>
        </div>
    )
}

export default Register
