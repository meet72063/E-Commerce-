import React from 'react';
import SignUpForm from '../Components/SignUp';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    return (
        <div className=''>
            <div className='bg-white  shadow-md shadow-gray-300 gap-3 md:grid md:grid-cols-12 '>
                <div className='col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-8 text-center p-10'>
                    <SignUpForm />
                </div>
                <div
                    className='lg:col-span-4 xl:col-span-4  md:col-span-4 bg-cover bg-center grid place-content-center p-3  text-white'
                    style={{
                        backgroundImage: `url('./background.jpg')`
                    }}
                >
                    <div className='lg:px-10 xl:px-10 lg:py-16 xl:py-16 '>
                        <h2 className='text-xl font-semibold text-blue-500'>Already have an account?</h2>
                        <p className='mt-4 mb-8 text-gray-300'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <Link to='/login'>   <button
                            className='bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400'
                            onClick={() => {
                                console.log('hii');
                            }}
                        >
                            Sign In
                        </button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
