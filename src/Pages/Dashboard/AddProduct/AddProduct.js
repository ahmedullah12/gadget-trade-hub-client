import React, { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { CiCircleRemove } from "react-icons/ci";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const {user} = useContext(AuthContext);
    const {register, handleSubmit,} = useForm();
    const [acceptedImage, setAcceptedImage] = useState({});
    const [descriptions, setDescriptions] = useState([]);
    const [descriptionInput, setDescriptionInput] = useState('');
    const navigate = useNavigate();
    

    const handleAddDescription = (e) => {
        if (descriptionInput.trim() !== '') {
            setDescriptions((prevDescriptions) => [...prevDescriptions, descriptionInput]);
            setDescriptionInput('');
          }
    };
    const handleRemoveDescription = (indexToRemove) => {
        setDescriptions((prevDescriptions) =>
          prevDescriptions.filter((_, index) => index !== indexToRemove)
        );
      };

    const onDrop = useCallback((acceptedFiles) => {
        const latestImage = acceptedFiles[acceptedFiles.length - 1];
        setAcceptedImage(latestImage);
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});


    const handleAddProduct = (data) => {
        const currentDate = new Date();
        const day = currentDate.getDate().toString();
        const monthNum = currentDate.getMonth() + 1;
        const month = monthNum.toString();
        const year = currentDate.getFullYear().toString();
        const image = acceptedImage;
        const imageHostKey = process.env.REACT_APP_imgbb_key;
  
        const formData = new FormData();
        formData.append('image', image);
        console.log(imageHostKey)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success === true){
                const productData = {
                    sellerName: user?.displayName,
                    sellerEmail: user?.email,
                    description: descriptions,
                    image: imgData.data.url,
                    brand: data.brand,
                    location: data.location,
                    productName: data.productName,
                    originalPrice: data.originalPrice,
                    resalePrice: data.resalePrice,
                    years_of_use: data.years_of_use,
                    post_date: `${year}-${month}-${day}`
                }

                fetch("https://phone-seller-server2.vercel.app/products", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(productData)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.acknowledged){
                        toast.success("Product Added SuccessFully");
                        navigate('/dashboard/allproducts');
                    }
                })
            }
        })
 
    } 
    return (
        <div className='pt-6 ps-0 md:ps-3 lg:ps-4'>
            <h2 className='text-3xl'>Add a Product {user?.displayName}</h2>
            <h3 className='text-xl'>Please fill in all the input fields to add a product</h3>
            {/* <p>{user?.displayName}</p> */}

            {/* add product form */}
            <form className='mt-6 ms-4'  onSubmit={handleSubmit(handleAddProduct)}>
                <div className="form-control w-full">
                    <label className='label'>
                        <span className="label-text">Select the Brand</span>
                    </label>
                    <select {...register("brand")} className="select select-bordered w-full max-w-xs">
                        <option value='Realme'>Realme</option>
                        <option value='Samsung'>Samsung</option>
                        <option value='Xiaomi'>Xiaomi</option>
                    </select>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input {...register("productName", {
                        required: "Product Name is required"
                    })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Product Photo</span>
                    </label>
                    <div className='block md:flex gap-4'>
                    <div {...getRootProps({className: 'dropzone'})}
                        className='p-4 border-dashed border-2 border-gray-400 cursor-pointer max-w-xs'
                    >
                        <input {...getInputProps({accept: 'image/*'})} />
                        {
                            isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select image</p>
                        }
                    </div>
                    {acceptedImage && (
                        <div className='mt-0 md:mt-7'>
                            <p><span className='text-green-600'>Dropped file:</span> {acceptedImage.name}</p>   
                        </div>
                    )}
                    </div>
                </div>
                
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input {...register("location", {
                        required: "Location is required"
                    })} type="text" placeholder="like Mirpur 10, Dhaka or Gulshan, Dhaka" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Original Price</span>
                    </label>
                    <input {...register("originalPrice", {
                        required: "Original Price is required"
                    })} type="number" placeholder="" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Resale Price</span>
                    </label>
                    <input {...register("resalePrice", {
                        required: "Resale Price is required"
                    })} type="number" placeholder="" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Years of Use</span>
                    </label>
                    <input {...register("years_of_use", {
                        required: "Years of Use is required"
                    })} type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                </div>
                <div>
                    <div className='flex gap-1 md:gap-3 lg:gap-4'>
                        <div className="form-control w-full  max-w-xs" >
                            <label className="label pb-0">
                                <span className="label-text">Description of the Product</span>
                            </label>
                            <label className="label pt-1">
                                <span className="label-text-alt">You can add multiple descriptions.</span>
                            </label>
                            
                            <textarea onChange={(e) => setDescriptionInput(e.target.value)}
                            value={descriptionInput} className="textarea textarea-bordered h-24 max-w-xs" placeholder="Description"></textarea>
                        </div>
                        
                        <div className='mt-16'>
                            <label onClick={handleAddDescription} className='btn btn-primary w-20 mt-3'>Add</label>
                        </div>
                    </div>
                    <div className='ms-4 mt-2 '>
                        <ol style={{ listStyleType: 'decimal' }}>
                            {
                                descriptions.map((description, i) => <li key={i}>{description}
                                    <button className='ms-6' onClick={() => handleRemoveDescription(i)}><CiCircleRemove className='text-red-700 text-lg' /></button>
                                </li>)
                            }
                        </ol>
                    </div>
                </div>

                <div className='text-center mt-3'>
                <button className='btn btn-primary' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;