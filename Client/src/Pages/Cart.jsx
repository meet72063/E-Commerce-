import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { selectCart, setCart } from '../Store.js/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../Components/CartItem'
import { selectUser } from '../Store.js/auth/userSlice'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { addNotification } from '../Store.js/Notification/notifications'
const baseURL = import.meta.env.VITE_SERVER_URL;
const STRIPE_API_KEY = import.meta.env.VITE_STRIPE_API_KEY


const Cart = () => {

    const { cartProducts } = useSelector(selectCart)
    const { user } = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const TotalPrice = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0)


    //fill cart from localStorage on render
    useEffect(() => {
        dispatch(setCart())
    }, [])



    const makePayment = async () => {
        //no user navigate to login page
        if (!user) {
            dispatch(addNotification({ message: 'please login', variant: 'info' }))
            navigate('/login')
            return
        }

        //use exist checkout
        const stripe = await loadStripe(STRIPE_API_KEY)
        const response = await axios.post(`${baseURL}/api/products/checkout`, { userId: user._id }, {
            headers: {
                Authorization: `Bearer ${STRIPE_API_KEY}`
            }
        })
        const result = stripe.redirectToCheckout({ sessionId: response.data.id })
        if (result.error) {
            dispatch(addNotification({ message: 'please login', variant: 'success' }))
        }

    }



    return (
        <div className='sm:px-28 p-8'>
            <div className='p-5 grid place-content-center'>
                <h1 className='text-2xl font-semibold'>Your Cart </h1>

            </div>


            {cartProducts.length > 0 ? <div>
                <table className="w-full  mt-5">
                    <thead>
                        <tr>
                            <th className="w-3/5 text-left p-2"></th>
                            <th className="w-1/5 text-left p-2">Price</th>
                            <th className="w-1/5 text-left p-2">Quantity</th>
                            <th className="w-1/5 text-left p-1">Total</th>
                            <th className=" 1/5 "></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* map products from cart */}
                        {cartProducts.map((item) => {

                            return <CartItem {...item} key={item._id} />
                        })}
                    </tbody>
                </table>


                <div className='mt-5 p-5  md:flex md:flex-row-reverse'>
                    <div className='bg-white shadow-md shadow-gray-300 w-full md:w-2/5 p-5 space-y-5 '>
                        <div className='h-4 flex justify-between p-1'>
                            <span>Subtotal</span>
                            <span>$ {TotalPrice}</span>
                        </div>
                        <div className='h-4 flex justify-between p-1'>
                            <span>Shipping</span>
                            <span>$ 2</span>
                        </div>
                        <hr />
                        <div className='h-4 flex justify-between p-1'>
                            <span>Grand Total</span>
                            <span>$ {TotalPrice + 2}</span>
                        </div>

                        <button className='p-2 mt-5 rounded-lg border text-lg w-full hover:bg-gray-100 active:bg-gray-500 active:text-white' onClick={makePayment}>
                            Checkout
                        </button>

                    </div>

                </div>

            </div> : <div className='text-center p-5 '>
                <h2 className='text-lg font-semibold text-gray-800'>is Empty</h2>
                <Link to='/products'>
                    <button className="bg-gradient-to-r mt-5 from-purple-400 to-pink-600 hover:from-pink-600 hover:to-purple-400 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                        Go to Shopping Page <FontAwesomeIcon icon={faArrowRight} style={{ color: 'black', marginLeft: '4px' }} />
                    </button>
                </Link>
            </div>}






        </div>



    )
}

export default Cart
