import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import { createUserAsync, selectUser } from '../Store.js/auth/userSlice';
import { Navigate } from 'react-router-dom';

const SignUpForm = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' })
    const { user } = useSelector(selectUser)


    const handleInput = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const dispatch = useDispatch()

    const submitUser = async () => {
        dispatch(createUserAsync(userData))
    }



    return (
        <div className="col-span-8  text-center p-10 relative">
            {user && <Navigate to='/products' replace={true}></Navigate>}
            <h2 className="text-3xl font-semibold">Sign Up</h2>
            <div className="mt-6">
                <input
                    type="text"
                    name='name'
                    placeholder="Name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                    value={userData.name}
                    onChange={handleInput}
                />
            </div>
            <div className="mt-4">
                <input
                    type="email"
                    name='email'
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                    value={userData.email}
                    onChange={handleInput}
                />
            </div>
            <div className="mt-4">
                <input
                    type="password"
                    name='password'
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                    minLength='6'
                    onChange={handleInput}
                />
            </div>
            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400"
                    onClick={submitUser}
                >
                    Sign Up
                </button>
            </div>
            <div className="mt-4">
                <p className="text-gray-600">or sign up with:</p>
                <div className="flex justify-center items-center space-x-4 mt-2">
                    <a href="#" className="text-blue-600 hover:underline">
                        <FontAwesomeIcon icon={faGoogle} size="2x" />
                    </a>
                    <a href="#" className="text-blue-800 hover:underline">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
