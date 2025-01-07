import { Link } from "react-router-dom";
import Image from "./assets/loginLogo.png";
import "./signup.css"
import useSignup from "../../hooks/useSignup";
import { useState } from "react";

const Signup = () => {

    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    })

    const {loading, signup} = useSignup();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await signup(inputs)
    }

    return (
        <div className='signup flex-col'>
            <div className='w-full flex justify-center'>
                <img
                    src={Image} 
                    alt="Reden Logo"
                    className='pb-8 w-4/12'
                />
            </div>
            <div>
                <h1 className='text-gray-200 font-semibold text-center text-2xl px-2 pb-8'>
                    Spill the beans, dude!
                </h1>
            </div>
            <div className='w-full flex justify-center'>
                <div className="card logbox w-7/12 shadow-xl">
                    <div className="justify-center">
                        <h1 className='font-semibold text-center text-gray-800 text-3xl px-2'>
                            Sign up for Reden
                        </h1>
                        <div className='flex items-stretch'>
                            <Link to='/login' className='text-sm text-gray-800 hover:underline hover:text-blue-950 mt-2 inline-block text-center mx-auto pb-4'>
                                Already have an account? Log in here.
                            </Link>
                        </div>
                        <form className='pb-2 justify-items-stretch' onSubmit={handleSubmit}>
                            <div className="pb-4 flex items-center justify-center">
                                <div className="w-6/12 px-4">
                                    <label className='label p-2'>
                                        <span className='font-semibold text-base label-text text-gray-800 font-sans'>Full name</span>
                                    </label>
                                    <input type='text' placeholder='Enter your full name' className='text-gray-200 w-full input input-bordered h-12 text-sm' 
                                        value={inputs.fullName}
                                        onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                                    />
                                </div>
                                <div className="w-6/12 px-4">
                                    <label className='label p-2'>
                                        <span className='font-semibold text-base label-text text-gray-800'>Username</span>
                                    </label>
                                    <input type='text' placeholder='Create a username' className='text-gray-200 w-full input input-bordered h-12 text-sm' 
                                        value={inputs.username}
                                        onChange={(e) => setInputs({...inputs, username: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="pb-4 flex items-center justify-center">
                                <div className="w-6/12 px-4">
                                    <label className='label p-2'>
                                        <span className='font-semibold text-base label-text text-gray-800 font-sans'>Password</span>
                                    </label>
                                    <input type='password' placeholder='Create a password' className='text-gray-200 w-full input input-bordered h-12 text-sm'
                                        value={inputs.password}
                                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                                    />
                                </div>
                                <div className="w-6/12 px-4">
                                    <label className='label p-2'>
                                        <span className='font-semibold text-base label-text text-gray-800'>Confirm password</span>
                                    </label>
                                    <input type='password' placeholder='Re-enter your password' className='text-gray-200 w-full input input-bordered h-12 text-sm' 
                                        value={inputs.confirmPassword}
                                        onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="w-6/12 px-4 place-self-center align-middle flex flex-col">
                                <label className='label p-2'>
                                    <span className='font-semibold text-base label-text text-gray-800 font-sans'>Gender</span>
                                </label>
                                    <select defaultValue={"Choose your gender"} className="select select-bordered" onChange={(e) => setInputs({...inputs, gender: e.target.value})}>
                                    <option value="Choose your gender" disabled>Choose your gender</option>
                                    <option value="male">
                                        Male
                                    </option>
                                    <option value="female">
                                        Female
                                    </option>
                                    <option value="other">
                                        Other
                                    </option>
                                </select>
                            </div>
                            <div className="card-actions justify-center pt-8">
                                <button className="btn btn-outline border-gray-800 text-gray-800 w-4/12" disabled={loading}>
                                    {loading ? <span className="loading loading-spinner"></span> : "Sign up"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup


// STARTER CODE
// import Image from "./assets/loginLogo.png";
// import "./signup.css"

// const signup = () => {
//   return (
//     <div className='signup flex-col'>
//         <div className='w-full flex justify-center'>
//             <img
//                 src={Image} 
//                 alt="Reden Logo"
//                 className='pb-8 w-4/12'
//             />
//         </div>
//         <div>
//             <h1 className='text-gray-200 font-semibold text-center text-2xl px-2 pb-8'>
//                 Spill the beans, dear!
//             </h1>
//         </div>
//         <div className='w-full flex justify-center'>
//             <div className="card logbox w-7/12 shadow-xl">
//                 <div className="justify-center">
//                     <h1 className='font-semibold text-center text-gray-800 text-3xl px-2'>
//                         Sign up for Reden
//                     </h1>
//                     <div className='flex items-stretch'>
//                         <a href='#' className='text-sm text-gray-800 hover:underline hover:text-blue-950 mt-2 inline-block text-center mx-auto pb-4'>
//                             Already have an account? Log in here.
//                         </a>
//                     </div>
//                     <form className='pb-8'>
//                         <div className="pb-4 flex items-center justify-center">
//                             <div className="w-6/12 px-4">
//                                 <label className='label p-2'>
//                                     <span className='font-semibold text-base label-text text-gray-800 font-sans'>Full name</span>
//                                 </label>
//                                 <input type='text' placeholder='Enter your full name' className='text-gray-200 w-full input input-bordered h-12 text-sm' />
//                             </div>
//                             <div className="w-6/12 px-4">
//                                 <label className='label p-2'>
//                                     <span className='font-semibold text-base label-text text-gray-800'>Username</span>
//                                 </label>
//                                 <input type='text' placeholder='Create a username' className='text-gray-200 w-full input input-bordered h-12 text-sm' />
//                             </div>
//                         </div>
//                         <div className="pb-4 flex items-center justify-center">
//                             <div className="w-6/12 px-4">
//                                 <label className='label p-2'>
//                                     <span className='font-semibold text-base label-text text-gray-800 font-sans'>Password</span>
//                                 </label>
//                                 <input type='text' placeholder='Create a password' className='text-gray-200 w-full input input-bordered h-12 text-sm' />
//                             </div>
//                             <div className="w-6/12 px-4">
//                                 <label className='label p-2'>
//                                     <span className='font-semibold text-base label-text text-gray-800'>Confirm password</span>
//                                 </label>
//                                 <input type='text' placeholder='Re-enter your password' className='text-gray-200 w-full input input-bordered h-12 text-sm' />
//                             </div>
//                         </div>
//                         <div className="w-full px-4 justify-center">
//                             <label className='label p-2'>
//                                 <span className='pl-36 font-semibold text-base label-text text-gray-800 font-sans'>Gender</span>
//                             </label>
//                             <select className="select select-bordered w-full max-w-xs">
//                                 <option disabled selected>Choose your gender</option>
//                                 <option>Male</option>
//                                 <option>Female</option>
//                                 <option>Other</option>
//                             </select>
//                         </div>
//                     </form>
//                     <div className="card-actions justify-center">
//                         <button className="btn btn-outline border-gray-800 text-gray-800 w-4/12">Log in</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </div>
//   )
// }

// export default signup