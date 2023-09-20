import React from 'react'

const ErrorMessage = () => {
    return (
        <p className=' text-red-500 mt-2 tracking-wider text-start absolute top-0 right-3 '>
            <span className='block  px-2 text-md font-semibold'>
                Invalid Email
            </span>
        </p>
    )
}

export default ErrorMessage
