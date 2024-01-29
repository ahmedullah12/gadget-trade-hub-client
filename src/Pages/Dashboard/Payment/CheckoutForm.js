import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({booking}) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const {price, buyerName, buyerEmail, _id} = booking;
    console.log(price)

    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("https://phone-seller-server2.vercel.app/create-payment-intent", {
        method: "POST",
        headers: {
           "Content-Type": "application/json" 
        },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    }, [price]);

    const handleSubmit =  async(event) => {
        event.preventDefault();

        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);

        if(card == null){
            return;
        };

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if(error){
            console.log(error);
            setCardError(error.message);
        }
        else{
            setCardError('')
        }
        setSuccess('');
        setProcessing(true)
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: card,
              billing_details: {
                name: buyerName,
                email: buyerEmail,
              },
            },
          });
          if(confirmError){
            setCardError(confirmError.message);
            return;
          }
    
          
          if(paymentIntent.status === "succeeded"){
            
            const payment = {
              price,
              transactionId: paymentIntent.id,
              buyerEmail,
              bookingId: _id,

            }
            fetch("https://phone-seller-server2.vercel.app/payments", {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if(data.insertedId){
                setSuccess('Congrats! your payment completed');
                setTransactionId(paymentIntent.id);
              }
            })
          }
          setProcessing(false)
    }
    
  return (
    <div  className="ms-2 md:ms-6">
      <div className="mb-4">
        <p className="opacity-70">Some test card numbers</p>
        <p className="text-base-300">4242 4242 4242 4242</p> 
        <p className="text-base-300">5555 5555 5555 4444</p> 
        <p className="text-base-300">4000 0566 5566 5566</p> 
      </div>
      <p className="mb-4" htmlFor="">Payment:</p>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm mt-4 btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret || processing}>
            Pay
        </button>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {
        success && <div>
          <p className="text-green-500">{success}</p>
          <p>Your transaction id: <span className="font-bold">{transactionId}</span></p>
        </div>
      }
    </div>
  );
};

export default CheckoutForm;
