import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import myContext from '../../Context/data/myContext'
function Profile() {

    const context = useContext(myContext);
    const { allNotes } = context;
    const [user, SetUser] = useState([]);

    const userData = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/auth/getuser`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }

            })

            const userData = await res.json();
            SetUser(userData);







        } catch (error) {
            console.log(error);
        }



    }

    useEffect(() => {
        userData();
    }, [])

    return (
        <Layout>
            {user ? (
                <div className="  mt-32 lg:mt-20 lg:mx-[30em]">
                    <div className="flex items-center justify-center  mb-2">
                        <img className="w-20" src="https://cdn-icons-png.flaticon.com/128/149/149071.png" alt="img" />
                    </div>
                    <h1 className='text-center font-semibold'>{user.name}</h1>
                    <h1 className='text-center font-semibold'>{user.email}</h1>
                    <h1 className='text-center font-semibold'>Total Notes Created : 
                    {allNotes.length}</h1>
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </Layout>
    )
}

export default Profile


