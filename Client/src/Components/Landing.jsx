import React, { useEffect, useState } from 'react'
import shopping from '../assets/shopping.jpg'
import { useNavigate } from 'react-router-dom'




const Landing = () => {
    const [animate, setAnimationClass] = useState('translate-x-[150%]')
    const navigate = useNavigate()
    useEffect(() => {
        const delay = setTimeout(() => {
            setAnimationClass('translate-x-0');
        }, 500);
        return () => clearTimeout(delay);
    }, [])

    return (
        <>
            <div className={`h-[100vh] w-full bg-gradient-to-r from-cyan-300 to-blue-300    md:bg-cover grid place-content-center `} style={{ backgroundImage: `url(${shopping})` }}>

                <div className={`container bg-transparent  w-[90vw] h-[80vh] rounded-md shadow-lg p-5 md:p-0 shadow-teal-800 bg-cover relative  opacity-80 `} >
                    <div className='md:absolute right-24  md:top-24 max-w-md space-y-5 md:space-y-3 ' >
                        <h2 className={`text-5xl font-serif mt-5 md:mt-0 font-extrabold text-red-500 text-shadow-lg leading-tight ease-in-out transition-all duration-1000 ${animate}`}>
                            Shop <span className="text-blue-500">Online</span>
                        </h2>
                        <p >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut sed sit aspernatur necessitatibus magnam. Aspernatur voluptates, corporis unde error quos incidunt quasi saepe necessitatibus inventore iure impedit natus eveniet ipsum.</p>
                        <button className='bg-red-500 hover:bg-red-600  text-white border-2 border-red-500 py-3 px-6 rounded-full font-semibold shadow-lg transition-transform transform scale-100 hover:scale-105 duration-300 ease-in-out'
                            onClick={() => navigate('/products')}>
                            Shop Now
                        </button>
                    </div>

                </div>
            </div>

        </>
    )
}



export default Landing
