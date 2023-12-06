import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from 'axios';
import { useQuery } from 'react-query';
import { FcCancel } from "react-icons/fc";
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const product = useLoaderData();
    const {_id,sellerName,sellerEmail, image, brand, description, originalPrice, resalePrice, productName, post_date, location, years_of_use} = product;
    const {user} = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonState, setButtonState] = useState('');
    
    const {data: reportedProducts = [], isLoading, refetch} = useQuery({
        queryKey: ["reported products"],
        queryFn: async() => {
            const res = await fetch(`https://phone-seller-server2.vercel.app/user-reports?email=${user.email}`)
            const data = await res.json();
            return data
        }
    })

    
    const isProductReported = reportedProducts.some(reportedProduct => reportedProduct.productId === _id)

    useEffect(() => {
        const isProductInWishlist = localStorage.getItem(`wishlist_${_id}_${user?.email}`);
        setButtonState(isProductInWishlist ? 'added' : '');
    }, [user, _id]);

    const handleAddtoWishlist = () => {
        const product = {
            productName: productName,
            productId: _id,
            sellerEmail: sellerEmail,
            wishedUser: user?.displayName,
            wishedUserEmail: user?.email,
        }
        axios.post("https://phone-seller-server2.vercel.app/wishlist", product)
        .then(res => {
            localStorage.setItem(`wishlist_${_id}_${user?.email}`, 'true');
            toast.success("Added to Wishlist");
            setButtonState('added');
        })
        .catch(err => console.log(err));
    }
    
    const handleReport = () => {
        const product = {
            productName: productName,
            productId: _id,
            sellerEmail: sellerEmail,
            reportedUser: user?.displayName,
            reportedUserEmail: user?.email,
        }
        axios.post("https://phone-seller-server2.vercel.app/user-reports", product)
        .then(res => {
            
            setIsModalOpen(false);
            toast.success("Product Reported");
            refetch();
        })
        .catch(err => console.log(err))
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
     
    if(isLoading){
        return (
            <span className="loading loading-spinner loading-lg mx-96 my-80"></span>
        );
    }
    return (
        <div>
            <h2 className='text-3xl text-center text-primary my-10'>Phone Details</h2>

            <div className='card w-[80%] md:w-[70%] lg:w-[60%] mx-auto bg-slate-100 py-10 px-5 rounded-sm mb-10 '>
                <img className='h-[200px] md:h-[300px] lg:h-[400px] mx-auto mb-8 rounded-lg' src={image} alt="" />
                <div className='card-body text-base md:text-lg px-0  relative'>

                    <div className='flex justify-end gap-x-2  absolute top-0 md:top-[6%]  right-0 '>
                        {
                            isProductReported ? 
                            <div className="tooltip" data-tip="You reported this product">
                                <label htmlFor='report-modal' className={`btn btn-sm btn-disabled  text-2xl`}>
                                    <FcCancel />
                                </label>
                            </div>
                            
                            :
                            <div className="tooltip" data-tip="Report this Product">
                                <label  htmlFor='report-modal' className={`btn btn-sm  btn-error text-2xl text-white `}>
                                    <FcCancel />
                                </label>
                            </div>
                            
                        }
                        <button onClick={handleAddtoWishlist} title='Nothing' className={`btn btn-sm $${buttonState === 'added' ? 'btn-disabled' : 'btn-success'} btn-success text-white text-xs md:text-base`} disabled={buttonState === 'added'}>
                            {buttonState === 'added' ? 'Added to Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>

                    <p className='mt-4'><span className='font-bold me-1'>Brand: </span>{brand}</p>
                    <p><span className='font-bold me-1'>Model: </span>{productName}</p>
                    <p><span className='font-bold me-1'>Description: </span>{description}</p>
                    <p><span className='font-bold me-1'>Seller: </span>{sellerName}</p>
                    <p><span className='font-bold me-1'>Location: </span>{location}</p>
                    <p><span className='font-bold me-1'>Original Price: </span>{originalPrice}</p>
                    <p><span className='font-bold me-1'>Resale Price: </span>{resalePrice}</p>
                    <p><span className='font-bold me-1'>Years of use: </span>{years_of_use}</p>
                    <p><span className='font-bold me-1'>Post Date: </span>{post_date}</p>
                </div>

                <div className='card-action mx-auto'>
                    <label htmlFor='booking-modal' className='btn btn-primary  my-3'>Book Now</label>
                </div>

            </div>
            {
                <BookingModal product={product}></BookingModal>
            }

            {/* confirm report product modal */}
            <input type="checkbox"  id="report-modal" className="modal-toggle" checked={isModalOpen}
            onChange={() => setIsModalOpen(!isModalOpen)}/>
            <div className="modal w-auto max-w-none">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to report this product</h3>

                    <div className="modal-action">

                        {/* if there is a button in form, it will close the modal */}
                        <label onClick={handleReport}   htmlFor="report-modal" className="btn">Yes</label>
                        <button onClick={handleCloseModal} className="btn">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        
    ); 
};

export default ProductDetails;