import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPR_PK)

const Payment = () => {
    const booking = useLoaderData();
    const navigation = useNavigation();
    if(navigation.state === "loading"){
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }
    const {productName, price} = booking;
    return (
        <div className='mt-4 ms-3'>
            <h3 className='text-xl md:text-2xl lg:text-3xl'>Payment for {productName}</h3>
            <p className='text-sm md:text-xl'>Please Pay {price} TK to buy the product</p>
            <div className='w-[90%] md:w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;