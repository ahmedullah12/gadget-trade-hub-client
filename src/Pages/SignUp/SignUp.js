import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signUpWithEmail, updateUser} = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState();
    const navigate = useNavigate();

    // const from = location.state?.from?.pathname || '/';

    const handleRegister = data => {
    
        setSignUpError('')
        signUpWithEmail(data.email, data.password)
        .then(res => {
            toast.success("Account Created Successfully");
            updateUser(data.name)
            .then(() => {})
            .then(error => console.log(error))
           
            saveUser(data.name, data.email, data.role);
        })
        .catch(err => {
            console.log(err);
            setSignUpError(err.message);
        })
    }


    const saveUser = (name, email, role) =>{
        const user = {name, email, role};
        fetch('https://phone-seller-server2.vercel.app/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            navigate('/');
        })
        .catch(err => console.log(err))
    }
    return (
        <div className=" flex justify-center items-center ">
      <div className="w-96 p-8">
        <h3 className="text-3xl text-center">Sign Up</h3>
        <form onSubmit={handleSubmit(handleRegister)}>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input {...register('name', {
                    required: "Name  is required"
                })}
                type="text" placeholder="Enter your Name" className="input input-bordered w-full max-w-xs" />
                {errors.name && <p className="text-red-600" role="alert">{errors.name.message}</p>}
            </div>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Account Type: </span>
                </label>
                <select {...register('role')} className="select select-bordered w-full max-w-xs">
                    <option value='buyer'>Buyer</option>
                    <option value='seller'>Seller</option>
                </select>
            </div>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input {...register('email', {
                    required: "Email Address is required"
                })}
                type="email" placeholder="Enter your Email" className="input input-bordered w-full max-w-xs" />
                {errors.email && <p className="text-red-600" role="alert">{errors.email.message}</p>}
            </div>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input {...register('password', {
                    required: 'Password is required',
                    minLength: {value: 8, message: "Password must be 8 character or long"} ,
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                        message: 'Password must be at least 8 characters and include at least one number and one symbol',
                      },
                })}
                type="password" placeholder="Enter your Password" className="input input-bordered w-full max-w-xs" />
                
                {errors.password && <p className="text-red-600" role="alert">{errors.password.message}</p>}
            </div>
            {
                signUpError && <p className='text-red-700'>{signUpError}</p>
            }

            <input className='btn btn-accent w-full my-4 text-white' value="Sign Up" type="submit" />
        </form>
        <p>Already have an account? Please <Link to='/login' className="text-secondary">Login.</Link></p>
        <div className="divider">OR</div>
        <div>
            <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
        </div>
      </div>
    </div>
    );
};

export default SignUp;