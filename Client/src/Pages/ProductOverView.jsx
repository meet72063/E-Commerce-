import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { addToCart, removeFromCart, selectCart } from '../Store.js/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReviewForm from '../Components/ReviewForm';
import Review from '../Components/Review';
import { Rating } from '@material-tailwind/react';
import { DefaultRating } from '../Components/Rating';
import { SliderCustomStyles } from '../Components/Slider'
import { getProduct } from '../Store.js/Product/productApi';
import LoadingSpinner from '../Components/LoadingSpinner';
import { addNotification } from '../Store.js/Notification/notifications';
import CarouselDefault from '../Components/Carousel';
import ErrorMessage from '../Components/ErrorMessage';

const ProductOverView = () => {

    const [inCart, setInCart] = useState(false)
    const { id } = useParams()
    const { cartProducts } = useSelector(selectCart)
    const [product, setProduct] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    const dispatch = useDispatch()




    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading('loading...')
                const response = await getProduct(id)
                setProduct(response.data.product)
                setLoading('')

            } catch (error) {
                setError(error)
                dispatch(addNotification({ message: error, variant: 'danger' }))
                setLoading('')
            }

        }
        fetchProduct()

    }, [id])





    //set in cart true if product is in cart on render
    useEffect(() => {
        const productIndex = cartProducts.findIndex((product) => product._id == id)
        if (productIndex !== -1) {
            setInCart(true)
        } else {
            setInCart(false)
        }

    }, [])






    const addingtoCart = () => {
        if (inCart) {
            dispatch(removeFromCart({ _id: product._id }))
            setInCart(false)
        }
        else {

            dispatch(addToCart({ product }))
            setInCart(true)
        }
    }

    //rating calculations 
    const ratings = {
        rating1: 0,
        rating2: 0,
        rating3: 0,
        rating4: 0,
        rating5: 0

    }

    let totalRating = 0

    product?.review?.forEach((item) => {
        totalRating += item.rating
        if (item.rating <= 1) ratings.rating1++
        else if (item.rating <= 2) ratings.rating2++
        else if (item.rating <= 3) ratings.rating3++
        else if (item.rating <= 4) ratings.rating4++
        else ratings.rating5++
    })

    const averageRating = totalRating / product?.review?.length

    if (error) {
        return <div className="sm:px-28 p-8 ">
            <ErrorMessage />
        </div>
    }


    return (
        <>
            <div className="sm:px-28 p-8 ">
                {loading ? <LoadingSpinner /> : product ? <div className='space-y-16'>

                    <div className='grid md:grid-cols-5 gap-x-5 space-y-8 md:space-y-0 '>
                        {/* product image */}
                        <div className='md:col-span-2 shadow-md shadow-gray-400  space-y-5  bg-white  '>
                            <CarouselDefault productmages={product.AdditionalImages} />

                        </div>


                        {/* product  description ,price, quantity*/}
                        <div className='md:col-span-3 md:col-start-3 shadow-md shadow-gray-400 bg-white p-5 space-y-7 pt-10'>

                            <div>
                                <h2 className='text-3xl font-bold text-blue-600 tracking-wider hover:text-blue-900 cursor-pointer'>{product.title}</h2>
                                <h3 className='font-serif text-xl font-bold hover:text-blue-900 cursor-pointer'>{product.category}</h3>
                            </div>

                            <hr className='border-t border-gray-300 my-4' />

                            <div className='text-gray-700 font-semibold'>
                                <p>Explore more from  <span className='text-red-300 cursor-pointer hover:underline'>{product.brand}</span></p>
                            </div>

                            <div className='text-gray-700'>{product.description}</div>

                            <div className='text-xl font-bold'>
                                <p className='line-through text-gray-500'>${product.price}</p>
                                <p className='text-2xl text-blue-600'>
                                    ${Math.round(product.price * (1 - product.discountPercentage / 100))}
                                </p>
                            </div>

                            <button className='border border-gray-300 shadow-md text-center flex items-center px-6 py-3 space-x-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transform transition-transform hover:scale-105'
                                onClick={addingtoCart}
                            >
                                <FontAwesomeIcon icon={faBagShopping} />
                                <span>{inCart ? "Remove from cart" : " Add to Cart"}</span>
                            </button>
                        </div>

                    </div>


                    <div className='grid lg:grid-cols-5 gap-x-5 space-y-8  md:space-y-0 '>
                        {/* ratings overview*/}
                        <div className='lg:col-span-2  '>
                            {product.review.length > 0 ?
                                <div className='shadow-md shadow-gray-400 p-5 space-y-5 bg-white'>
                                    <div className='space-y-2'>
                                        <h1 className='font-semibold text-lg'>Rating</h1>
                                        <DefaultRating totalReviews={product.review.length} averageRating={averageRating} />
                                    </div>

                                    <div className='border-2 border-gray-200'>

                                    </div>

                                    {[1, 2, 3, 4, 5].map((number) => {
                                        return <div className='space-x-2 flex items-center' key={number} >
                                            <div className=''>
                                                {number} Star
                                            </div>
                                            <div className='grow'>
                                                <SliderCustomStyles rating={((ratings[`rating${number}`]) / product.review.length) * 100} />
                                            </div>
                                            <div className=''>
                                                {(((ratings[`rating${number}`]) / product.review.length) * 100).toFixed(0)}%
                                            </div>

                                        </div>
                                    })}



                                </div>

                                : <div className='shadow-md shadow-gray-400 p-5 space-y-5 bg-white pb-8 '>
                                    <div className='flex justify-between'><h2 className='font-semibold text-lg'>Rating</h2>
                                        <Rating readonly value={0} /></div>
                                    <hr />
                                    <p className='h-10 w-10 mx-auto'>
                                        <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 500 512.22"><path d="m414.86 206.15 48.95 47.13-74.58 78.33-59.92 16.07c-2.15.42-3-.44-2.65-2.46l13.58-60.74 74.62-78.33zM295.7 347.57c7.32-.2 13.44 5.59 13.64 12.91.2 7.32-5.59 13.43-12.91 13.63-13.43.37-22.78 7.36-26.7 15.62-1.59 3.35-2.26 6.89-1.9 10.12.31 2.74 1.45 5.31 3.5 7.34 5.93 5.9 18.8 8.48 40.55 3.21 3.44-.84 10.38-3.16 19.08-6.07 41.29-13.81 117.15-39.18 128.97-3.93 2.31 6.94-1.43 14.48-8.38 16.8-6.94 2.32-14.48-1.43-16.79-8.37-3.38-10.09-62.95 9.83-95.38 20.67-9.29 3.11-16.71 5.6-21.26 6.7-32.22 7.81-53.66 1.63-65.52-10.18-6.58-6.55-10.24-14.68-11.2-23.26-.92-8.09.59-16.57 4.29-24.36 7.77-16.38 25.36-30.15 50.01-30.83zM103.57 225.85c-7.07 0-12.8-5.73-12.8-12.8 0-7.06 5.73-12.79 12.8-12.79h161.17c7.07 0 12.8 5.73 12.8 12.79 0 7.07-5.73 12.8-12.8 12.8H103.57zm0 82.69c-7.07 0-12.8-5.72-12.8-12.79 0-7.07 5.73-12.8 12.8-12.8h147.39c7.07 0 12.79 5.73 12.79 12.8s-5.72 12.79-12.79 12.79H103.57zm0 82.7c-7.07 0-12.8-5.73-12.8-12.8 0-7.06 5.73-12.79 12.8-12.79h87.51c7.06 0 12.79 5.73 12.79 12.79 0 7.07-5.73 12.8-12.79 12.8h-87.51zM246.01 36.73v43.24c1 13.08 5.56 23.36 13.56 30.2 8.31 7.09 20.71 11.07 37.13 11.36l37.27-.04-87.96-84.76zm96.71 110.34-46.22-.05c-22.76-.36-40.67-6.48-53.52-17.45-13.38-11.44-20.92-27.68-22.45-47.78l-.11-1.76V25.59H63.61c-20.94 0-38.02 17.08-38.02 38.02V448.6c0 20.85 17.16 38.02 38.02 38.02h241.11c15.7 0 30.03-9.98 35.58-24.65 2.47-6.59 9.85-9.92 16.44-7.45 6.59 2.48 9.92 9.85 7.44 16.44-9.32 24.59-33.11 41.26-59.46 41.26H63.61C28.69 512.22 0 483.51 0 448.6V63.61C0 28.67 28.67 0 63.61 0h175.94c3.79 0 7.21 1.65 9.54 4.28l115.27 111.06c2.6 2.5 3.91 5.85 3.91 9.2l.04 74c0 7.07-5.73 12.8-12.79 12.8-7.07 0-12.8-5.73-12.8-12.8v-51.47zm120.87 24.5c-2.27-2.18-4.92-3.2-7.96-3.16-3.03.05-5.62 1.24-7.77 3.48l-17.46 18.18 49 47.3 17.64-18.36c2.11-2.13 2.99-4.9 2.96-7.95-.05-3-1.13-5.72-3.26-7.78l-33.15-31.71zm-89.91 157.2-36.75 9.85c-1.33.26-1.85-.26-1.62-1.5l8.32-37.26 30.05 28.91z"
                                        /></svg>
                                    </p>

                                    <h3 className='text-center font-body w-full'>Be the first To Write review</h3>
                                </div>

                            }

                        </div>

                        {/* reviews of the product*/}

                        <div className='lg:col-span-3 lg:col-start-3 space-y-4 '>

                            {
                                product.review.map((review, index) => {
                                    return <Review review={review} key={review._id} index={index} />
                                })
                            }
                            <ReviewForm productId={id} setProduct={setProduct} />

                        </div>
                    </div>
                </div> : <h2>{error}</h2>}
            </div>
        </>
    )

}

export default ProductOverView
