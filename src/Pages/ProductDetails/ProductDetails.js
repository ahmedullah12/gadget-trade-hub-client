import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from 'axios';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { MdVerified } from 'react-icons/md';
import { GoHeart, GoHeartFill } from "react-icons/go";
import { BsExclamationCircle, BsExclamationCircleFill } from "react-icons/bs";

const ProductDetails = () => {
    const product = useLoaderData();
    const {_id,sellerName,sellerEmail, image, brand, description, originalPrice, resalePrice, productName, post_date, location, years_of_use} = product;
    const {user} = useContext(AuthContext);


    const {data: seller = {} } = useQuery({
        queryKey: ["seller"],
        queryFn: async() => {
            const res = await axios.get(`https://phone-seller-server2.vercel.app/user?email=${sellerEmail}`);
            const data = await res.data;
            return data;
        }
    })
    console.log(seller);
    // get wishlist product
    const {data: wishlistProducts = [], refetch: wishlistRefetch} = useQuery({
        queryKey: ["wishlist products"],
        queryFn: async() => {
            const res = await fetch(`https://phone-seller-server2.vercel.app/wishlist?email=${user?.email}`)
            const data = await res.json();
            return data
        }
    })
    const isWishlistProduct = wishlistProducts.some(wishedProducts => wishedProducts.productId === _id);
    
    
    const {data: reportedProducts = [], isLoading, refetch} = useQuery({
        queryKey: ["reported products"],
        queryFn: async() => {
            const res = await fetch(`https://phone-seller-server2.vercel.app/user-reports?email=${user.email}`)
            const data = await res.json();
            return data
        }
    })
    const isProductReported = reportedProducts.some(reportedProduct => reportedProduct.productId === _id)


    const handleWishlist = () => {
        if (isWishlistProduct === true) {
            // If product is in wishlist, remove it
            axios.delete(`https://phone-seller-server2.vercel.app/wishlist?productId=${_id}`)
                .then(res => {
                    if (res.status === 200 || res.status === 204) {  // Checking for success status
                        wishlistRefetch();
                        toast.success("Removed from Wishlist");
                    }
                })
                .catch(err => console.log(err));
        } else {
            // If product is not in wishlist, add it
            const product = {
                productName: productName,
                productId: _id,
                sellerEmail: sellerEmail,
                wishedUser: user?.displayName,
                wishedUserEmail: user?.email,
            }
            axios.post("https://phone-seller-server2.vercel.app/wishlist", product)
                .then(res => {
                    if (res.status === 200) {  // Checking for Created status
                        toast.success("Added to Wishlist");
                        wishlistRefetch();
                    }
                })
                .catch(err => console.log(err));
        }
    }
    
    
    const handleReport = () => {
        if(isProductReported === true){
            axios.delete(`https://phone-seller-server2.vercel.app/reports?id=${_id}`)
            .then(res => {
                if(res.status === 200){
                    toast.success("Product Unreported");
                    refetch();
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        else{
            const product = {
                productName: productName,
                productId: _id,
                sellerEmail: sellerEmail,
                reportedUser: user?.displayName,
                reportedUserEmail: user?.email,
            }
            axios.post("https://phone-seller-server2.vercel.app/user-reports", product)
            .then(res => {
                toast.success("Product Reported");
                refetch();
            })
            .catch(err => console.log(err))
        }
    }

     
    if(isLoading){
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }
    
    if (!_id || !sellerName || !sellerEmail || !image || !brand || !description || !originalPrice) {
        return (
            <div className="text-center text-red-600 flex items-center justify-center min-h-screen px-4">
                <p>Product has been deleted or is no longer available.</p>
            </div>
        );
    }
    return (
        <div>
            <h2 className='text-3xl text-center text-primary my-10'>Phone Details</h2>

            <div className='card w-[80%] md:w-[70%] lg:w-[60%] mx-auto bg-slate-100 py-10 px-5 rounded-sm mb-10 '>
                <img className='h-[200px] md:h-[300px] lg:h-[400px] mx-auto mb-8 rounded-lg' src={image} alt="" />
                <div className='card-body text-base md:text-lg p-0  relative'>
                <div className='mr-3 inline-flex justify-end'>
                    <div className='mr-3 inline-block'>
                        {
                            isProductReported ? <BsExclamationCircleFill onClick={handleReport} className='text-xl cursor-pointer' style={{ color: "orange" }} /> : <BsExclamationCircle onClick={handleReport} className='text-xl cursor-pointer' />
                        }
                    </div>
                    <div className='mr-3 inline-block'>
                        {
                            isWishlistProduct ? <GoHeartFill onClick={handleWishlist} className='text-xl cursor-pointer' style={{ color: "red" }} /> : <GoHeart onClick={handleWishlist} className='text-xl cursor-pointer' />
                        }
                    </div>
                </div>


                    <p className='mt-4'><span className='font-bold me-1'>Brand: </span>{brand}</p>
                    <p><span className='font-bold me-1'>Model: </span>{productName}</p>
                    <p><span className='font-bold me-1'>Description: </span>{description}</p>
                    <p><span className='font-bold me-1'>Seller:</span> {sellerName} <span>{seller.verified === "true" && <MdVerified style={{ color: 'blue' }} className="inline mb-1"/>}</span></p>
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
        </div>
        
    ); 
};

export default ProductDetails;