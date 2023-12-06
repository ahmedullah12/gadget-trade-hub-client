import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const {loginWithEmail} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation()
  
  const from = location.state?.from?.pathname || '/';

  const handleLogin = data => {
    
    loginWithEmail(data.email, data.password)
    .then(res => {
      navigate(from, {replace: true});
    })
    .catch(err => console.log(err));
  }
  return (
    <div className="h-[600px] flex justify-center items-center">
      <div className="w-96 p-8">
        <h3 className="text-3xl text-center">Login</h3>
        <form onSubmit={handleSubmit(handleLogin)}>
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
                    minLength: {value: 6, message: "Password must be 6 character or long"} 
                })}
                type="password" placeholder="Enter your Password" className="input input-bordered w-full max-w-xs" />
                <label className="label">
                    <span className="label-text-alt">Forgot Password?</span>
                </label>
                {errors.password && <p className="text-red-600" role="alert">{errors.password.message}</p>}
            </div>

            <input className='btn btn-accent w-full my-4 text-white' value="Login" type="submit" />
        </form>
        <p>New to Phone Seller? Please <Link to='/signup' className="text-secondary">Sign Up.</Link></p>
        <div className="divider">OR</div>
        <div>
            <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
