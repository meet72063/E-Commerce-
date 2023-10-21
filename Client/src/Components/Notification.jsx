import React, { useEffect, useRef } from 'react'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { removeNotification, selectNotification } from '../Store.js/Notification/notifications'

const Notification = () => {
    const { notification } = useSelector(selectNotification)
    const notficationRef = useRef()//stores clearTimeout Id
    const dispatch = useDispatch()



    useEffect(() => {

        if (notification) {
            //clear timeout 
            clearTimeout(notficationRef.current)
            notficationRef.current = setTimeout(() => {
                dispatch(removeNotification())
            }, 4000)
        }
    }, [notification])





    if (!notification) {
        return <></>
    }

    return (
        <div className={`fixed top-5  right-3 md:right-5 p-1 px-3 md:p-4 ${notification.variant === 'success' ? 'bg-green-300' : (notification.variant === 'info' ? 'bg-blue-400' : 'bg-red-400')} text-white rounded shadow flex items-center justify-between space-x-3 z-10`}>
            <div>{notification.message}</div>
            <button className="text-white " onClick={() => dispatch(removeNotification())}>
                <FontAwesomeIcon icon={faClose} />
            </button>
        </div>
    )
}

export default Notification
