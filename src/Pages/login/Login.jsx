import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const navigate = useNavigate();

    //Handle Login Function

    const loginHandle = async () => {
        const res = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })


        //handle Responses

        const loginData = await res.json();
        console.log(loginData);
        console.log(loginData.token);

        //conditions

        if (loginData.error) {
            toast.error(loginData)
        }
        else {
            navigate('/')
            toast.success(loginData.success)
            localStorage.setItem('token', loginData.token)
        }

        SetEmail("");
        SetPassword("");



    }


    return (
        <div className=' flex justify-center items-center h-screen'>

            {/* main div  */}
            <div className=' bg-[#d2cbbf] shadow-md px-10 py-10 rounded-xl '>

                {/* Top Heading  */}
                <div className="">
                    <h1 className='text-center text-black text-xl mb-4 font-bold'>Login</h1>
                </div>

                {/* Input 1 Email  */}
                <div>
                    <input
                        value={email}
                        onChange={(e) => SetEmail(e.target.value)}
                        type="email"
                        name='email'
                        className=' bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Email'
                    />
                </div>

                {/* Input 2 Password  */}
                <div>
                    <input
                        value={password}
                        onChange={(e) => SetPassword(e.target.value)}
                        type="password"
                        className='bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Password'
                    />
                </div>

                {/* Button For Login  */}
                <div className=' flex justify-center mb-3'>
                    <button onClick={loginHandle}
                        className=' bg-green-700 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>

                {/* Link for Signup  */}
                <div>
                    <h2 className='text-black'>Don't have an account <Link className=' text-red-700 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login