import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import Cookies from 'js-cookie';
import type { FormErrors, FormSubmitEvent } from '../types/login';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendURL } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const formErrors: FormErrors = {};
    if (currentState === 'Sign Up' && !name.trim()) {
      formErrors.name = 'Name is required';
    }
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      formErrors.email = 'Invalid email format';
    }
    if (!password) {
      formErrors.password = 'Password is required';
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/';
  const onSubmitHandler = async (e: FormSubmitEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (currentState == 'Sign Up') {
        const reponse = await axios.post(backendURL + '/api/user/register', {
          name,
          email,
          password,
        });
        if (reponse.data.success) {
          setToken(reponse.data.token);
          Cookies.set('token', reponse.data.token);
        } else {
          toast.error(reponse.data.message);
        }
        console.log(reponse.data);
      } else {
        const response = await axios.post(backendURL + '/api/user/login', {
          email,
          password,
        });
        console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          Cookies.set('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    if (token) {
      // navigate("/");
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt- text-center text-2xl font-bold tracking-tight text-purple-500">
            {currentState === 'Login'
              ? 'Log in to your account'
              : 'Sign up for an account'}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmitHandler} className="space-y-6">
            <div>
              {currentState === 'Login' ? (
                ''
              ) : (
                <div>
                  {' '}
                  <label className="block text-sm/6 font-medium text-purple-600">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="name"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className="block font-semibold w-full border-1 border-purple-500 border-solid rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-purple-600">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="block font-semibold w-full border-1 border-purple-500  border-solid rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-purple-600">
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="block w-full font-semibold border-1 border-purple-500 border-solid rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-purple-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div className="text-sm flex justify-between mt-2">
                <p className="font-semibold text-purple-400 hover:text-indigo-300">
                  Forgot password?
                </p>
                {currentState === 'Login' ? (
                  <p
                    onClick={() => setCurrentState('Sign Up')}
                    className="font-semibold text-purple-400 cursor-pointer hover:text-indigo-300"
                  >
                    Create account
                  </p>
                ) : (
                  <p
                    onClick={() => setCurrentState('Login')}
                    className="font-semibold cursor-pointer  text-purple-400 hover:text-indigo-300"
                  >
                    Login here
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-pink-500  px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer focus-visible:outline-indigo-500"
              >
                {currentState == 'Login' ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
