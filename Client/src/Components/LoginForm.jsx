import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, selectUser } from '../Store.js/auth/userSlice';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
    const [userData, setUserData] = useState({ email: '', password: '' })
    const { user } = useSelector(selectUser)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUserAsync(userData))
    }






    return (
        <div className='col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-8 text-center p-10 relative'>
            {user && <Navigate to='/products'></Navigate>}
            <h2 className='text-xl font-semibold'>Login</h2>

            <div className='mt-4'>
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400'
                    onChange={handleChange}
                />
            </div>

            <div className='mt-4'>
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={handleChange}
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400'
                />
            </div>
            <div className='mt-2 text-right'>
                <a href='#' className='text-blue-500 hover:underline' onClick={() => { console.log('forgot password') }}>
                    Forgot Password?
                </a>
            </div>
            <div className='mt-6'>
                <button
                    type='submit'
                    className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400'
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </div>
            <div className="mt-4">
                <p className="text-gray-600">or log in with:</p>
                <div className="flex justify-center items-center space-x-4 mt-2">
                    <p className="text-blue-600 hover:underline">
                        <FontAwesomeIcon icon={faGoogle} size="2x" />
                    </p>
                    <p className="text-blue-800 hover:underline">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
