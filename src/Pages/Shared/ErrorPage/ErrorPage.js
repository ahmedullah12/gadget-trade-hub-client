import React, { useContext } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const ErrorPage = () => {
    const {logOut} = useContext(AuthContext)
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
        .then(() => {
            navigate('/login');
        })
        .catch(err => console.log(err))
      }
    return (
        <div className='flex justify-center items-center min-h-[100vh]'>
            <div className=''>
            <p className='text-red-600'>Something Went Wrong!!!</p>
            <p className='text-red-500'>{error.statusText || error.message}</p>
            <h4 className='text-3xl mt-3'>Please <Link className='btn btn-primary' onClick={handleLogOut} to='/login'>Log Out</Link> and log back in</h4>
        </div>
        </div>
    );
};

export default ErrorPage;