// import React, { useEffect, useState } from 'react'
// import { editUser, updateUser } from '../../../Api/Users/Users';
// import { useParams } from 'react-router-dom';
// import { images } from '../../../Constatnts/Images';
// import SekeletonProfile from '../../../Components/Skeleton/SekeletonProfile';
// import SekeletonRow from '../../../Components/Skeleton/SekeletonRow';
// import SekeletonButton from '../../../Components/Skeleton/SekeletonButton';

// // Const Inputs
// const inputFields = [
//     { label: "Name", type: "text", name: "name", placeholder: "Name", autoComplete: "name" },
//     { label: "Email", type: "email", name: "email", placeholder: "Email", autoComplete: "email" },
//     { label: "Phone", type: "number", name: "phone", placeholder: "Phone", autoComplete: "mobile tel" },
// ];

// function UserCreate() {

//     // Initial form state
//     const initialFormState = {
//         image: '',
//         name: '',
//         email: '',
//         phone: '',
//     };

//     // States
//     const [form, setForm] = useState(initialFormState);
//     const [loading, setLoading] = useState(true);

//     // Prams
//     const { id } = useParams();

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
//         updateUser(id, form).then((response) => { setForm(initialFormState) }).catch((error) => {
//             console.error('Error updating user:', error);
//         });;
//     };

//     useEffect(() => {
//         editUser(id).then((response) => { setForm(response.data.content), setLoading(false) }).catch((error) => { setLoading(true) });
//     }, [])


//     return (
//         <div className='w-full h-full p-5 overflow-hidden'>
//             <div className='w-full h-full relative border-2 border-gray-50 shadow-lg rounded-2xl overflow-y-auto'>
//                 {loading ? (
//                     <>
//                         <div className='w-full mx-auto flex justify-center flex-col mt-5 p-3 gap-3 sm:gap-6'>
//                             <SekeletonProfile width={160} height={160} />
//                             <SekeletonRow height={25} />
//                         </div>
//                         <div className='flex justify-center'>
//                             <SekeletonButton width={210} height={45} />
//                         </div>
//                     </>
//                 ) : (
//                     <form onSubmit={handleSubmit} className="absolute w-full mx-auto flex justify-center flex-col mt-5 p-5 gap-3 sm:gap-6">
//                         <label htmlFor="imageupload" className='rounded-full w-40 h-40 relative overflow-hidden'>
//                             <img src={form.image ? URL.createObjectURL(form.image) : form.media ? form.media[0].original_url : ''} className="w-full h-full absolute object-cover" alt="" />
//                             <input id='imageupload' type="file" name='image' onChange={handleChange} className='hidden' />
//                         </label>
//                         {inputFields.map((input, index) => (
//                             <input key={index} type={input.type} name={input.name} value={form[input.name]} placeholder={input.placeholder} autoComplete={input.autoComplete} onChange={handleChange} className='p-3 border-b' />
//                         ))}
//                         <button type='submit' className='w-52 mx-auto p-2 bg-slate-700 text-white rounded-lg'>Create User</button>
//                     </form>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default UserCreate
