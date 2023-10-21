import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutFailedPage = () => {
    return (
        <div className="bg-red-100 min-h-[70vh] flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-4xl font-semibold text-red-600 mb-4">
                    Checkout Failed
                </h1>
                <p className="text-lg text-gray-700">
                    We apologize, but there was an issue with your order.
                </p>
                <p className="text-lg text-gray-700">
                    Please try again or contact our support team.
                </p>
                <Link to='/products'>  <button className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Continue Shopping
                </button></Link>
            </div>
        </div>
    );
};

export default CheckoutFailedPage;
