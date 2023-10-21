import React from 'react'
import { selectUser } from '../Store.js/auth/userSlice'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Protected = ({ childern }) => {
    const { user } = useSelector(selectUser)

    return (
        <>
            {!user && <Navigate to='/login' replace={true}></Navigate>}
            {childern}
        </>
    )
}

export default Protected
