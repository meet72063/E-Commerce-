import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBagShopping, faChevronDown, faChevronUp, } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loggedOutUser, selectUser } from '../Store.js/auth/userSlice';
import Brands from './Brands';
import { setCart } from '../Store.js/cart/cartSlice';
import { searchProduct } from '../Store.js/Product/productApi';

export default function Navbar({ openSideBar, setOpenSideBar }) {
    const [brandsVisible, setBrandsVisible] = useState(false);
    const [loginOption, setLoginOptions] = useState(false)
    const [searchresult, setSearchResult] = useState([])
    const [keyword, setKeyword] = useState('')


    const { user } = useSelector(selectUser)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toggleBrands = () => {
        setBrandsVisible(!brandsVisible);
    };
    const handlechange = async (e) => {

        setKeyword(e.target.value)
        try {
            if (e.target.value === '') {
                setSearchResult([])
                return
            }
            const response = await searchProduct(e.target.value)
            setSearchResult(response.data.products)
        } catch (error) {

        }
    };

    const logOutHandler = () => {
        dispatch(loggedOutUser())
        localStorage.setItem("cart", JSON.stringify([]));
        dispatch(setCart())
        navigate('/login')
    }


    return (
        <div className='h-40 p-5 gap-12 font-roboto sm:px-20 md:px-28  w-full top-0 bg-[#f5ebe0] md:flex md:justify-around items-center flex-wrap grid grid-rows-3 py-6'>
            <div className='flex gap-10 items-center justify-between'>
                <h2 className='text-3xl order-2'>
                    <button onClick={() => setOpenSideBar(true)}> <FontAwesomeIcon icon={faBars} style={{ color: "#ccd5ae" }} /></button>
                </h2>
                <Link to='/'><span className='font-semibold md:order-2 text-lg text-[#4b3825]'>MERN STACK</span></Link>
            </div>

            <div className='relative'>
                <input type="search" placeholder='Search products' value={keyword} className='border w-full lg:w-80 h-8 px-5  bg-white  border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={handlechange} />
                {searchresult.length > 0 && <div className='rounded-md w-full space-y-2 lg:w-80  px-5 py-3 shadow-md z-10  shadow-gray-700 absolute top-8 bg-white  ' onClick={() => setSearchResult([])} >
                    {searchresult.map((product) => {
                        return <div key={product._id} className='grid grid-cols-2  items-center'>
                            <Link to={`/productOverview/${product._id}`}> <img src={product.image} alt="" className='md:h-16 md:w-24 w-32 h-24 rounded-md ' /></Link>
                            <Link to={`/productOverview/${product._id}`} ><h2 className='hover:text-red-300'>{product.title}</h2></Link>

                        </div>
                    })}
                </div>}
            </div>

            <div className='flex justify-between gap-1 sm:gap-10 '>
                <Link to='/cart'><FontAwesomeIcon icon={faBagShopping} /></Link>
                <div className='relative'>
                    <h2 onClick={toggleBrands} style={{ cursor: 'pointer' }} >Brands {brandsVisible ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />} </h2>
                    {brandsVisible && (
                        <Brands onClick={toggleBrands} />
                    )}
                </div>

                <Link to='/products'>Shop</Link>
                <div className='relative'>
                    <button onClick={() => setLoginOptions(!loginOption)} >Welcome {loginOption ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</button>
                    <span className='ml-5 text-red-300'>{user?.name}</span>

                    {loginOption && <div className='bg-white shadow-md  absolute top-6 w-full text-sm z-10 p-2' onMouseLeave={() => setLoginOptions(false)}>
                        {user ? <button className=' p-3  text-center hover:bg-gray-200 w-full' onClick={logOutHandler}>log out</button> : <div> <Link to='/login'><button className='w-full hover:bg-gray-100 p-3 m-1 rounded-sm '>Login</button></Link>
                            <Link to='/signUp'><button className='p-3  hover:bg-gray-100  rounded-sm  w-full'>Sign Up</button></Link></div>
                        }

                    </div>
                    }
                </div>

            </div>
        </div>
    );
}

