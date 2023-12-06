import React, { useState } from 'react';
import toast from 'react-hot-toast';

const UpdateModal = ({product}) => {
    const {_id, productName, originalPrice, resalePrice, post_date, years_of_use} = product;
    const [modalOpen, setModalOpen] = useState(false);

    const handleUpdate = event => {
        event.preventDefault()
        const form = event.target;
        const updatedData = {
            resalePrice: form.updatedResalePrice.value,
            years_of_use: form.updatedYearsOfUse.value,
        }
        fetch(`https://phone-seller-server2.vercel.app/products/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedData)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success("Product Updated");
                setModalOpen(false);
                form.reset();
            }
        })
    }
    return (
        <>
    <input type="checkbox" id="update-modal" className="modal-toggle" checked={modalOpen} onChange={() => setModalOpen(!modalOpen)} />
    <div className="modal">
        <div className="modal-box relative">
            <label htmlFor="update-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold mb-8">{productName}</h3>
            <form onSubmit={handleUpdate}  className="grid grid-cols-1 gap-y-3" action="">
                <p>Posted Date: {post_date}</p>
                <label htmlFor="">Original Price</label>
                <input  type="text" disabled value={originalPrice} className="input input-bordered w-full " />
                <label htmlFor="">Resale Price</label>
                <input name='updatedResalePrice' type="number" placeholder={resalePrice}  className="input input-bordered w-full " />
                <label htmlFor="">Years of Use</label>
                <input name='updatedYearsOfUse' type="text" placeholder={years_of_use}  className="input input-bordered w-full " />
                <button type='submit' className='btn btn-primary'>Update</button>
            </form>
        </div>
    </div>
</>
    );
};

export default UpdateModal;