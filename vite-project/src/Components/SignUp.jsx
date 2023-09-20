import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import ErrorMessage from './ErrorMessage';

const SignUpForm = () => {
    const [error, setError] = useState(true)

    return (
        <div className="col-span-8  text-center p-10 relative">
            {error && <ErrorMessage />}
            <h2 className="text-3xl font-semibold">Sign Up</h2>
            <div className="mt-6">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
            </div>
            <div className="mt-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
            </div>
            <div className="mt-4">
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
            </div>
            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400"
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
