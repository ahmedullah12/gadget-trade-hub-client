import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookingModal = ({product}) => {
    const {user} = useContext(AuthContext)
    const {_id,productName} = product;
    const [modalOpen, setModalOpen] = useState(false);

    const handleBook = (e) => {
        e.preventDefault();
        const form = e.target;
        const buyerLocation = form.buyerLocation.value;
        const buyerNumber = form.buyerNumber.value;

        const booking = {
            buyerName: user.displayName,
            buyerEmail: user.email,
            productId: _id,
            productName: productName,
            buyerLocation,
            buyerNumber
        }

        axios.post("https://phone-seller-server2.vercel.app/bookings", booking)
        .then(res => {
            if(res.data.acknowledged){
                toast.success("Booking Confirmed");
                setModalOpen(false);
                form.reset();
            }
            else{
                toast.error(res.data.message)
            }
        })
        .catch(err => console.log(err));
        
    }
    return (
    <>
        <input type="checkbox" className="modal-toggle"  id='booking-modal' checked={modalOpen}
        onChange={() => setModalOpen(!modalOpen)}/>
        <div  className="modal">
            <div className="modal-box relative">
                <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="text-lg font-bold mb-8">{productName}</h3>
                <form onSubmit={handleBook} className="grid grid-cols-1 gap-y-3" action="">
                    <input className="input input-bordered w-full max-w-xs" type="text" name="" id="" defaultValue={user?.displayName} disabled/>
                    <input className="input input-bordered w-full max-w-xs" type="text" name="" id="" defaultValue={user?.email} disabled/>
                    <label htmlFor="">Your Location</label>
                    <input className="input input-bordered w-full max-w-xs" type="text" name="buyerLocation" id=""/>
                    <label htmlFor="">Your Phone Number</label>
                    <input className="input input-bordered w-full max-w-xs" type="number" name="buyerNumber" id=""/>
                    <button className='btn btn-primary' type='submit'>Book</button>
                </form>
                
            </div>
        </div>
    </>
    );
};

export default BookingModal;