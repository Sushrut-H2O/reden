import { Link } from "react-router-dom";
import Image from "./assets/loginLogo.png";
import "./login.css"
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {loading, login} = useLogin();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await login(username, password);
    }

    return (
    <div className='login flex-col'>
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
                        Log in to Reden
                    </h1>
                    <div className='flex items-stretch'>
                        <Link to='/signup' className='text-sm text-gray-800 hover:underline hover:text-blue-950 mt-2 inline-block text-center mx-auto pb-4'>
                            Don't have an account? Sign up now!
                        </Link>
                    </div>
                    <form className='pb-2' onSubmit={handleSubmit}>
                        <div>
                            <label className='label p-2'>
                                <span className='font-semibold text-base label-text text-gray-800'>Username</span>
                            </label>
                            <input type='text' placeholder='Enter your username' className='text-gray-200 w-full input input-bordered h-12 text-sm' 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className='label p-2 pt-4'>
                                <span className='font-semibold text-base label-text text-gray-800 font-sans'>Password</span>
                            </label>
                            <input type='password' placeholder='Enter your password' className='text-gray-200 w-full input input-bordered h-12 text-sm' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="card-actions justify-center pt-8">
                            <button className="btn btn-outline border-gray-800 text-gray-800 w-4/12" disabled={loading}>
                                {loading ? <span className="loading loading-spinner"></span> : "Log in"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default Login


// STARTER CODE
// import Image from "./assets/loginLogo.png";
// import "./login.css"

// const Login = () => {
//     return (
//     <div className='login flex-col'>
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
//                         Log in
//                     </h1>
//                     <div className='flex items-stretch'>
//                         <a href='#' className='text-sm text-gray-800 hover:underline hover:text-blue-950 mt-2 inline-block text-center mx-auto pb-4'>
//                             Don't have an account? Sign up now!
//                         </a>
//                     </div>
//                     <form className='pb-8'>
//                         <div>
//                             <label className='label p-2'>
//                                 <span className='font-semibold text-base label-text text-gray-800'>Username</span>
//                             </label>
//                             <input type='text' placeholder='Enter your username' className='text-gray-200 w-full input input-bordered h-10 text-sm' />
//                         </div>
//                         <div>
//                             <label className='label p-2 pt-4'>
//                                 <span className='font-semibold text-base label-text text-gray-800 font-sans'>Password</span>
//                             </label>
//                             <input type='text' placeholder='Enter your password' className='text-gray-200 w-full input input-bordered h-10 text-sm' />
//                         </div>
//                     </form>
//                     <div className="card-actions justify-center">
//                         <button className="btn btn-outline border-gray-800 text-gray-800 w-4/12">Log in</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </div>
//     )
//   }
  
//   export default Login