import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBagShopping, } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Navbar({ openSideBar, setOpenSideBar }) {
    const [brandsVisible, setBrandsVisible] = useState(false);
    const [loginOption, setLoginOptions] = useState(false)
    const [searchresult, setSearchResult] = useState(false)

    const toggleBrands = () => {
        setBrandsVisible(!brandsVisible);
    };
    const toggleSearchResult = (e) => {
        setSearchResult(!searchresult);
    };


    return (
        <div className='h-40 p-5 gap-12 sm:px-28  w-full top-0 bg-[#f5ebe0] md:flex md:justify-around items-center flex-wrap grid grid-rows-3 py-6'>
            <div className='flex gap-10 items-center justify-between'>
                <h2 className='text-3xl order-2'>
                    <button onClick={() => setOpenSideBar(true)}> <FontAwesomeIcon icon={faBars} style={{ color: "#ccd5ae" }} /></button>
                </h2>
                <Link to='/'><span className='font-semibold md:order-2 text-lg text-[#4b3825]'>MERN STACK</span></Link>
            </div>

            <div className='relative'>
                <input type="search" placeholder='Search products' value='' className='border rounded-md w-full lg:w-80 h-8 px-5 ' onChange={toggleSearchResult} />
                {searchresult && <div className='rounded-md w-full lg:w-80  px-5  shadow-md z-10  shadow-gray-700 absolute top-8 bg-white  ' >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae repellendus sed saepe nesciunt voluptate quibusdam qui, recusandae, iure sequi architecto fugit impedit laudantium esse aperiam aspernatur suscipit quas exercitationem unde eveniet quia. Ipsa ratione deserunt hic nisi sint! Accusamus distinctio corrupti omnis. Dicta veniam, ratione repudiandae omnis natus explicabo tempora inventore assumenda maiores aliquid dolore hic dolorum odio delectus culpa in vitae enim ut quasi ducimus quisquam? Est sint beatae corporis, nesciunt magnam explicabo tenetur ipsum, et repudiandae fugiat voluptas in. Ratione, pariatur, nesciunt hic consequatur aut rerum ullam voluptas cupiditate praesentium ad atque qui ducimus reprehenderit reiciendis suscipit soluta?
                </div>}
            </div>

            <div className='flex justify-between gap-10'>
                <Link to='/cart'><FontAwesomeIcon icon={faBagShopping} /></Link>
                <div className='relative'>
                    <h2 onClick={toggleBrands} style={{ cursor: 'pointer' }} className={`${brandsVisible && 'text-blue-800'}`}>Brands</h2>
                    {brandsVisible && (
                        <div className='bg-white h-30 shadow-md rounded-sm p-5  shadow-gray-700 w-[70vw] sm:w-[50vw] md:w-[50vw]  absolute top-8 -left-5 md:left-0 lg:-translate-x-[200px]  xl:-translate-x-[680px] z-10'>
                            <div className='flex justify-between mb-3'>
                                <h1>Shop By Brands</h1>

                                {/* <Button>See All</Button> */}
                            </div>

                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-3'>

                                <div className=' text-center border-2 border-zinc-800 rounded-md'>
                                    gucci
                                </div>



                                {/* Add content for Brands here */}
                            </div>
                        </div>
                    )}
                </div>

                <Link to='/products'>Shop</Link>
                <div className='relative'>
                    <button onClick={() => setLoginOptions(!loginOption)}>Welcome</button>
                    {loginOption && <div className='bg-white shadow-md  absolute top-6 w-full text-sm z-10' onMouseLeave={() => setLoginOptions(false)}>
                        <Link to='/login'><button className='p-3  hover:bg-gray-100 border-b  m-1 rounded-sm'>login</button></Link>
                        <Link to='/signUp'><button className='p-3  hover:bg-gray-100  m-1 rounded-sm'>Sign Up</button></Link>

                    </div>
                    }
                </div>

            </div>
        </div>
    );
}

