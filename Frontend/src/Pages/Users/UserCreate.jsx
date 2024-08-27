// import React, { useState } from 'react'
// import { inputFields } from '../../../Constatnts/InputsFields'
// import { createUser } from '../../../Api/Users/Users';
// import { images } from '../../../Constatnts/Images';

// function UserCreate() {
//     // Initial form state
//     const initialFormState = {
//         image: '',
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//         password_confirmation: ''
//     };

//     // States
//     const [form, setForm] = useState(initialFormState);

//     // Handle Change
//     const handleChange = (e) => {
//         if (e.target.name === 'image') {
//             setForm({ ...form, image: e.target.files[0] });
//         } else {
//             setForm({ ...form, [e.target.name]: e.target.value });
//         }
//     }

//     // Create User
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         createUser(form).then((response) => { setForm(initialFormState), console.log(response); });
//     };

//     return (
//         <div className='w-full h-full p-5 overflow-hidden'>
//             <div className='w-full h-full relative border-2 border-gray-50 shadow-lg rounded-2xl overflow-y-auto'>
//                 <header className='py-3 px-8 absolute text-2xl text-gray-800 font-light'>Cretae User</header>
//                 <form onSubmit={handleSubmit} className="absolute w-full mx-auto flex justify-center flex-col mt-5 p-5 gap-3 sm:gap-6">
//                     <label htmlFor="imageupload" className='rounded-full w-40 h-40 relative overflow-hidden'>
//                         <img src={form.image ? URL.createObjectURL(form.image) : images.profile} className="w-full h-full absolute object-cover" alt="" />
//                         <input id='imageupload' type="file" name='image' onChange={handleChange} className='hidden' />
//                     </label>
//                     {inputFields.map((input, index) => (
//                         <input key={index} type={input.type} name={input.name} value={form[input.name]} placeholder={input.placeholder} autoComplete={input.autoComplete} onChange={handleChange} className='p-3 border-b' />
//                     ))}
//                     <button type='submit' className='w-52 mx-auto p-2 bg-slate-700 text-white rounded-lg'>Create User</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default UserCreate