import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMenuSharp as Menu, IoCloseSharp as MenuClose } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { useRecoilState } from 'recoil';
import { userState } from "../store";

const Navbar = () => {

  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = location.pathname;
  const profileRef = useRef(null);

  // States
  const [user, setUser] = useRecoilState(userState);

  const handleLogout = async () => {
    try {
      const res = await axios.delete("http://localhost:3000/api/auth/logout", {
        data: {
          id: user.user._id
        }
      })

      if (res.data.success) {
        toast.success('Logout Successfully');
        setUser({});
      }
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    // check if local storage has user data 

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl flex-1 font-bold text-blue-600">
          <Link to={'/'}>Blog App</Link>
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 relative">
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li>
              <Link to="/" className={`${pathname == '/' ? 'text-blue-800' : ''} hover:text-blue-500 transition duration-300`}>Home</Link>
            </li>
            <li>
              <Link to="/posts" className={`${pathname == '/posts' ? 'text-blue-800' : ''} hover:text-blue-500 transition duration-300`}>Posts</Link>
            </li>
            <li>
              <Link to="/create" className={`${pathname == '/create' ? 'text-blue-800' : ''} hover:text-blue-500 transition duration-300`}>Create Post</Link>
            </li>
            {user?.auth?.isAuthenticated && <li className='relative' ref={profileRef}>
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex cursor-pointer items-center space-x-2 hover:text-blue-500 transition duration-300">
                <FaRegUserCircle className="text-3xl text-gray-700" />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <ul className="absolute right-0 z-50 text-black bg-[#7e7777] top-12 w-40 shadow-md rounded-lg py-2 transition-all duration-300 transform scale-95 origin-top-right">
                  <li>
                    <Link to="#" className="block px-4 py-2 hover:bg-gray-100 transition duration-300">{user?.user?.name}</Link>
                  </li>
                  <li>
                    <Link to="#" className="block px-4 py-2 hover:bg-gray-100 transition duration-300" onClick={handleLogout}>Logout</Link>
                  </li>
                </ul>
              )}
            </li>}
            {!user?.auth?.isAuthenticated && <li>
              <Link to="/login" className={`${pathname == '/login' ? 'text-blue-800' : ''} hover:text-blue-500 transition duration-300`}>Login</Link>
            </li>}
          </ul>
        </div>

        {/* Mobile Menu (Optional) */}
        <div className="md:hidden z-50">
          <button className="text-gray-700 focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <MenuClose className='text-2xl' /> : <Menu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      <div className={`md:hidden fixed left-0 top-0 w-full bg-white bg-opacity-95 backdrop-blur-md transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } transition-all duration-300 ease-in-out`}>
        <ul className="flex flex-col items-center space-y-4 py-4 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-blue-500 transition" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/posts" className="hover:text-blue-500 transition" onClick={() => setIsMobileMenuOpen(false)}>Posts</Link></li>
          <li><Link to="/create" className="hover:text-blue-500 transition" onClick={() => setIsMobileMenuOpen(false)}>Create Post</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar