import React from 'react'
import { Rating } from '@material-tailwind/react';



const Review = ({ review, index }) => {

    const { userId: { name }, userId: { createdAt }, comment, rating } = review

    // different background color for review avtar pic
    const avatarBackgroundColors = [
        "gray-500",
        "red-300",
        "green-500",
        "teal-500",
        "blue-500",
        "pink-500",
        "purple-500",
        "yellow-500",
        "orange-500",

    ];

    const backgroundColor = avatarBackgroundColors[index % avatarBackgroundColors.length]



    // Parse the date string into a JavaScript Date object
    const createdDate = new Date(createdAt);

    // Create a new Intl.DateTimeFormat object with the desired format options
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Format the date and time using the formatter
    const formattedDate = formatter.format(createdDate);



    return (
        <div className='shadow-sm shadow-gray-300 p-5 flex space-x-5  bg-white'>
            <div className='items-center flex'>
                <div className={`rounded-3xl bg-${backgroundColor} w-12 h-12  flex justify-center items-center`}>
                    <p className='capitalize text-lg'>{name.slice(0, 1)}</p>
                </div>
            </div>

            <div className='grow space-y-1'>
                <h3 className='text-md font-body'>{formattedDate}</h3>
                <div className='font-light text-gray-700'>
                    {comment}
                </div>

            </div>

            <div>
                <Rating value={rating} readonly />
            </div>

        </div>
    )
}

export default Review
