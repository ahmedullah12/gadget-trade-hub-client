import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from 'react-query';

const Navbar = () => {
  const {user, logOut} = useContext(AuthContext);

  const {data: savedUser} = useQuery({
    queryKey: ["user",user],
    queryFn: async() => {
      const res = await fetch(`https://phone-seller-server2.vercel.app/users?email=${user?.email}`);
      const data = await res.json();
      return data;
    }
  });


  const handleLogOut = () => {
    logOut()
    .then(() => {})
    .catch(err => console.log(err))
  }
    const menuItems = (
        <>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/'>About</Link>
            </li>
            <li>
                <Link to='/'>Blog</Link>
            </li>
            {
              user?.uid ?

              <>
                <li>
                  {
                    savedUser?.role === "buyer" ? 
                    <Link to="/dashboard/mybookings">Dashboard</Link> :
                    savedUser?.role === "seller" ?
                    <Link to="/dashboard/allproducts">Dashboard</Link> :
                    <Link to="dashboard/alluser">Dashboard</Link>
                  }
                </li>
                <li className='text-secondary'>
                  <Link to="/">{user?.displayName}</Link>
                </li>
                <li>
                  <Link onClick={handleLogOut} to='/login'>Log Out</Link>
                </li>
              </>
                 :
                <li>
                  <Link to='/login'>Login</Link>
                </li>
            }
        </>
    )
    return (
        <div className="navbar bg-primary text-white">
  <div className="navbar-start mx-3 md:mx-8 lg:mx-12" >
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52 text-black z-50">
        {menuItems}
        
      </ul>
    </div>
    <a className="btn btn-ghost text-xl" href='/'>PhoneSeller</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {menuItems}
    </ul>
  </div>
  
  
</div>
    );
};

export default Navbar;