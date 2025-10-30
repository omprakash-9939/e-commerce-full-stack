import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { setShowSearch } from '../redux/searchSlice';
import { ShopContext } from '../context/ShopContext';
import Cookies from 'js-cookie';
import { selectCartCount } from '../redux/cartSlice';
import { Badge } from 'antd';
import usericon from '../assets/useri.png'

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const totalCount = useSelector(selectCartCount);
  const { navigate, token, setToken } = useContext(ShopContext);
  const logout = () => {
    navigate('/login');
    Cookies.remove('token');
    setToken('');
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img
          src={assets.logo3}
          className="w-16 object-contain"
          alt="logo"
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            clipPath: 'inset(10% 10% 10% 10%)',
          }}
        />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none hidden h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 hidden border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 hidden border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 hidden border-none h-[1.5px] bg-gray-700" />
        </NavLink>
      </ul>
      {/*create search bar  */}
      <div className="flex items-center gap-6">
        <img
          // onClick={()=>setShowSearch(true)}
          onClick={() => dispatch(setShowSearch(true))}
          src={assets.search_icon}
          alt="search icon"
          className="w-5 cursor-pointer"
        />
        <div className="group z-10 relative inline-block">
          <img
            src={ token ? usericon : assets.profile_icon}
            onClick={() => (!token ? navigate('/login') : null)}
            alt="user icon"
            className={`w-5 rounded-full cursor-pointer ${token ? "border-2 border-pink-600":""}`}
          />

          {token ? (
            <div className="absolute right-0 top-full hidden group-hover:block">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md">
                <p
                  onClick={() => navigate('/profile')}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/orders')}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <Link to="/cart" className="relative">
          <Badge count={totalCount} size="small" showZero>
            <img
              src={assets.cart_icon}
              alt="carticon"
              className="w-5 min-w-5 cursor-pointer"
            />
          </Badge>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menuicon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      <div
        className={`absolute top-0 right-0 z-50 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="dricon"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className={({ isActive }) =>
              `block py-2 pl-6 rounded-lg font-medium transition-all duration-200
            ${
              isActive
                ? 'bg-[#9241b4] text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
            }`
            }
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className={({ isActive }) =>
              `block py-2 pl-6 rounded-lg font-medium transition-all duration-200
            ${
              isActive
                ? 'bg-[#9241b4] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
            }`
            }
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className={({ isActive }) =>
              `block py-2 pl-6 rounded-lg font-medium transition-all duration-200
            ${
              isActive
                ? 'bg-[#9241b4] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
            }`
            }
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className={({ isActive }) =>
              `block py-2 pl-6 rounded-lg font-medium transition-all duration-200
            ${
              isActive
                ? 'bg-[#9241b4] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
            }`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
