import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";

const Contact = () => {
  const {user} = useContext(AuthContext);
  const { register, handleSubmit, formState: {errors} } = useForm();

  const handleSubmitContact = (data) => {
    // Send data to backend or handle submission logic here
    console.log(data);

    const formattedMessage = data.message.replace(/\n/g, '\r\n');

    const mailContent = {
        name: user?.displayName,
        email: data.email,
        message: formattedMessage,
    };

    axios.post('https://phone-seller-server2.vercel.app/send-email', {mailContent})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };

  
  return (
    <div className="h-[600px] flex justify-start ms-[10px] md:ms-[100px] lg:ms-[300px]">
      <div  className="w-[600px] p-8">
        <h3 className="text-3xl text-center">Contact Us</h3>
        <form onSubmit={handleSubmit(handleSubmitContact)}>
            <div className="form-control  ">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                type="text" defaultValue={user?.displayName} className="input input-bordered " disabled/>
            </div>
            <div className="form-control  ">
                <label className="label">
                    <span className="label-text block">Email</span>
                </label>
                <small>Please enter mehebehasan0124@gmail.com for mailgun free service</small>
                <input
                {...register('email', {
                  required: "Please enter Email Address"
                })}
                type="email"  className="input input-bordered " />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Message</span>
                </label>
                <textarea
                {...register('message', {
                    required: "Message is required",
                })}
                placeholder="Enter your message"
                className="textarea textarea-bordered"
                rows="6"></textarea>
                {errors.message && (
                <p className="text-red-600" role="alert">
                    {errors.message.message}
                </p>
                )}
            </div>
            
            
            <input className='btn btn-accent my-4 mx-auto text-white' value="Submit" type="submit" />
        </form>
        
      </div>
    </div>
  );
};

export default Contact;
