import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  // states 
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');

  const navigate = useNavigate();
  // handle signup api 
  const signupHandle = async () => {
    // app call 

    const res = await fetch('http://localhost:8000/api/auth/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })

    // recieving response 

    const signupData = res.json();
    console.log(signupData);

    //Condition

    if (signupData.error) {
      toast.error(signupData.error)
    }
    else {
      toast.success(signupData.success)
      navigate('/login')
    }

    SetName("");
    SetEmail("");
    SetPassword("");


  }


  return (
    <div className=' flex justify-center items-center h-screen'>

      {/* main div  */}
      <div className=' bg-[#d2cbbf] shadow-md px-10 py-10 rounded-xl '>

        {/* Top Heading  */}
        <div className="">
          <h1 className='text-center text-black text-xl mb-4 font-bold'>Signup</h1>
        </div>

        {/* Input 1 Name  */}
        <div>
          <input
            value={name}
            onChange={(e) => SetName(e.target.value)}
            type="text"
            name='name'
            className=' bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
            placeholder='Name'
          />
        </div>

        {/* Input 2 Email  */}
        <div>
          <input
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            type="email"
            name='email'
            className=' bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
            placeholder='Email'
          />
        </div>

        {/* Input 3 Password  */}
        <div>
          <input
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            type="password"
            className='bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
            placeholder='Password'
          />
        </div>

        {/* Button For Signup  */}
        <div className=' flex justify-center mb-3'>
          <button onClick={signupHandle}
            className=' bg-red-700 w-full text-white font-bold  px-2 py-2 rounded-lg'>
            Signup
          </button>
        </div>

        {/* Link For Login  */}
        <div>
          <h2 className='text-black'>Have an account <Link className=' text-green-700 font-bold' to={'/login'}>Login</Link></h2>
        </div>
      </div>
    </div>
  )
}

export default Signup