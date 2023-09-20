import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import ErrorMessage from './ErrorMessage';

const LoginForm = () => {

    const [error, setError] = useState(false)

    const handleForgotPassword = () => {
        // Implement the password recovery logic here
        // For example, you can open a modal or navigate to a "Forgot Password" page
        // where users can reset their password.
        console.log('Forgot Password clicked');
    };

    return (
        <div className='col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-8 text-center p-10 relative'>
            {error && <ErrorMessage />}
            <h2 className='text-xl font-semibold'>Login</h2>

            <div className='mt-4'>
                <input
                    type='email'
                    placeholder='Email'
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400'
                />
            </div>

            <div className='mt-4'>
                <input
                    type='password'
                    placeholder='Password'
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400'
                />
            </div>
            <div className='mt-2 text-right'>
                <a href='#' className='text-blue-500 hover:underline' onClick={handleForgotPassword}>
                    Forgot Password?
                </a>
            </div>
            <div className='mt-6'>
                <button
                    type='submit'
                    className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400'
                >
                    Login
                </button>
            </div>
            <div className="mt-4">
                <p className="text-gray-600">or log in with:</p>
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

export default LoginForm;
