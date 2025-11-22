import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  EnvelopeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import asosIcon from '../assets/asosglobal_logo.png';
import { useNavigate } from 'react-router-dom';
import { supabase} from '../utils/supabase.js';
import axios from 'axios';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here

     if(formData.password !== formData.confirmPassword){
            setMsg('Passwords do not match')
              return;
            }
            
  
    try {
      setLoading(true);
      const { data, error} = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });
  
      if (error) {
            console.log(error);
            setMsg(error.message);
            return
        }

        console.log(data.user);
        setMsg('User has been successfully registered');
  
    //   setUserAuth(data.user);
    //   // localStorage.setItem('user', JSON.stringify(user));
  
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing in:', error);
      setMsg( 'An error occurred during sign up, please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };







  return (
    <div className="flex mx-auto justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-[4px] mb-8"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={asosIcon} alt="asosglobal icon" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Admin - ASOS GLOBAL 
          </span>
        </motion.div>

        <div className="max-w-6xl md:ml-[530px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Join ASOS GLOBAL as an admin</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {msg &&
                    <p className='text-amber-500 text-center text-sm px-5 py-[2px] rounded-full bg-amber-100'>{msg}</p>
                }
              <div>
                <label className="block text-sm font-medium text-gray-700 mt-[-10px] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-12 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-black to-gray-800 py-4 rounded-xl font-semibold text-lg text-white hover:shadow-2xl hover:shadow-gray-500/25 transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Getting your account ready...</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-900 hover:text-black font-semibold transition-colors"
                >
                  sign in
                </button>
              </p>
            </div>
          </motion.div>

          {/* Right Side - Features & Benefits */}
          {/* Add your features section here if needed */}
        </div>
      </div>
    </div>
  );
};

export default Register;