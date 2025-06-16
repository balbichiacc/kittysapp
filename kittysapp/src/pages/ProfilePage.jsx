import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

const Profilepage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState('Martin Johnson');
  const [bio, setBio] = useState('Hi Everyone, I am Using QuickChat');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You could add save logic here if needed
    navigate('/');
  };

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg p-6 gap-6'>

        {/* Left Side - Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 flex-1'>
          <h3 className='text-lg font-semibold'>Profile Details</h3>

          {/* Profile Image Upload */}
          <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>
            <input
              onChange={(e) => {
                if (e.target.files[0]) {
                  setSelectedImg(e.target.files[0]);
                  e.target.value = null; // allow reselecting same file
                }
              }}
              type='file'
              id='avatar'
              accept='.png, .jpg, .jpeg'
              hidden
            />
            <img
              src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon}
              alt='avatar'
              className={`w-12 h-12 object-cover ${selectedImg ? 'rounded-full' : ''}`}
            />
            Upload profile image
          </label>

          {/* Name Field */}
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='p-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500'
            placeholder='Your Name'
          />

          {/* Bio Field */}
          <textarea
            rows='4'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className='p-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500'
            placeholder='Your Bio'
          ></textarea>

          {/* Save Button */}
          <button
            type='submit'
            className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'
          >
            Save Changes
          </button>

          {/* Go Back Button */}
          <button
            type='button'
            onClick={() => navigate(-1)}
            className='text-sm text-gray-400 underline hover:text-white mt-2'
          >
            ← Go Back
          </button>
        </form>

        {/* Right Side - Static Logo */}
        <img
          className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10'
          src={assets.logo_icon}
          alt='Profile Logo'
        />
      </div>
    </div>
  );
};

export default Profilepage;
