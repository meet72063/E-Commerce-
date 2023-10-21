import React, { useEffect, useState } from 'react'
import { Slider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectProuduct } from '../Store.js/Product/productsSlice';

const PriceFilter = () => {
    const { maxPrice, minPrice } = useSelector(selectProuduct)
    const [value, setValue] = useState([minPrice, maxPrice])
    const dispatch = useDispatch()


    useEffect(() => {
        setValue([minPrice, maxPrice])
    }, [maxPrice, minPrice])


    const minDistance = 100
    const handleChange = (e, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
            dispatch(changeFilter({ key: 'minPrice', value: newValue[0] }))
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
            dispatch(changeFilter({ key: 'maxPrice', value: newValue[1] }))

        }


    }





    return (
        <div className='h-40 border-[0.1px] shadow-sm shadow-gray-200 rounded-md space-y-3  bg-white  p-3'>
            <div className=' bg-slate-300 flex items-center pl-8 '>

                <h2 className='text-xl font-semibold'>Price Range</h2>

            </div>
            <div className='flex items-center px-8 py-2 '>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby='range-slider'
                    min={0}
                    max={2000}
                    color="secondary"

                />
            </div>
            <div className='px-8'>price between {value[0]}-{value[1]}</div>
        </div>
    )
}

export default PriceFilter

