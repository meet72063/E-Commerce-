import React, { useState } from 'react'
import { Rating, Textarea } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../Store.js/auth/userSlice';
import ErrorMessage from './ErrorMessage'
import { addReview } from '../Store.js/auth/userApi';
import { useNavigate } from 'react-router-dom';




const ReviewForm = ({ productId, setProduct }) => {

    const [recommendationOptions, setRecommendationOptions] = useState(false)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [recommend, setRecommend] = useState('Yes')
    const { user } = useSelector(selectUser)

    const handleChange = (e,) => {
        setComment(e.target.value)
    }

    const navigate = useNavigate()


    const handleSubmit = async () => {
        if (!rating || !comment) {
            setError('please provide both the fields')
            return
        }

        if (!user) {
            alert('please login to Add Review')
            navigate('/login')
            return
        }



        try {
            setLoading(true)
            setError(false)
            const response = await addReview(productId, { comment, rating, userId: user._id })
            setLoading(false)
            setProduct(response.data.product)
            setComment('')
            setRating(0)


        } catch (error) {
            setError('an error occured while publishing review')
            setLoading(false)
        }
    }



    return (
        <div className='shadow-sm shadow-gray-400 p-5 space-y-5 bg-white relative'>
            <div>
                <h1 className='text-xl font-semibold text-gray-800'>Add Review</h1>

            </div>
            {error && <h2 className='text-red-200 '>{error}</h2>}


            <Textarea color="gray" label="Write your review here" value={comment} onChange={handleChange} />

            <div className='space-y-2'>
                <h2>Rating</h2>
                <Rating value={rating} onChange={(value) => setRating(value)} defaultValue={3} />
            </div>

            <div className='space-y-2 '>
                <h2>will your recommend this product?</h2>
                <div>
                    <div className='h-10 w-full border-[0.01px] border-gray-300 flex items-center px-2  justify-between' >
                        <h2>{recommend}</h2>
                        <button onClick={() => setRecommendationOptions(!recommendationOptions)}> <FontAwesomeIcon icon={faCircleDown} /></button>
                    </div>
                    {recommendationOptions && <div className=' border-[0.01px] border-gray-300 mb-2 flex-col flex  ' onMouseLeave={() => setRecommendationOptions(!recommendationOptions)}>
                        <button className={`text-left hover:bg-gray-300 p-2 ${recommend === 'Yes' && 'bg-gray-100'}`} onClick={() => {
                            setRecommendationOptions(!recommendationOptions)
                            setRecommend('Yes')
                        }}>Yes</button>
                        <button className={`text-left hover:bg-gray-300 p-2 ${recommend === 'No' && 'bg-gray-100'}`} onClick={() => {
                            setRecommendationOptions(!recommendationOptions)
                            setRecommend('No')

                        }}>No</button>
                    </div>}
                </div>

                <button className={`border-[0.01px]  space-x-3 text-center border-gray-400 flex  px-10 p-3 items-center rounded-md active:bg-gray-100 bg-gray-100 ${loading && 'bg-gray-400 opacity-50 '}`} onClick={handleSubmit} >
                    {loading ? "Publishing review..." : "Publish Review"}
                </button>

            </div>


        </div>
    )
}

export default ReviewForm

