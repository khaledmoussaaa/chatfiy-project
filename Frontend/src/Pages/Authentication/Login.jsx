// Imports
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Header, Social, Submit, ErrorMessage, InputClass, Background } from "../../Components/Auth Component/Imports";
import useAuthContext from "../../Context/AuthContext";

// Login Component
function Login() {
    // States
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const { login, loading, success, errors } = useAuthContext();

    // handle input onChange
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        login(form);
    };

    return (
        <div className="w-full h-full relative bg-[#f4f7fe]">
            {/* Container Form */}
            <div className="w-[95%] h-fit sm:w-2/3 flex justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg shadow-slate-200">
                {/* Form */}
                <div className="w-full h-full xl:w-1/2">
                    {/* Logo */}
                    <Logo />

                    {/* Header */}
                    <Header header="Welcome Back" subheader="Hi, Please enter your details." />

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="w-4/5 mx-auto flex justify-center flex-col mt-5 xl:mt-10 gap-4 xl:gap-10">
                        <div className="flex flex-col gap-10 relative">
                            {/* Inputs */}
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Or Phone"
                                    onChange={handleChange}
                                    autoComplete="email"
                                    className={`border-b p-2 w-full ${InputClass(errors.email, success)}`}
                                />
                                <ErrorMessage error={errors.email} />
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    className={`border-b p-2 w-full ${InputClass(errors.password, success)}`}
                                />
                                <ErrorMessage error={errors.password} />
                            </div>

                            {/* Message Error */}
                            {errors.message && <span className="text-red-500 absolute bottom-7 text-center">{errors.message}</span>}
                         
                        </div>

                        {/* Submit */}
                        <Submit buttonName="Login" loading={loading} title="Don't have an account?" sign="Sign Up" navigate="/register" />
                    </form>
                </div>

                {/* Background */}
                <Background path="Background.png" />
            </div>
        </div>
    );
}

export default Login;
