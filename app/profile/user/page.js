'use client'
import React, { useState, useEffect } from 'react';
import HeaderLogout from '@/components/shared/HeaderLogout';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    isVerfied: false,
    githubLink: '',
    instagramLink: '',
    websiteLink: '',
  });

  useEffect(() => {
    // Fetch user details on component mount
    axios.get('/api/users/meuser')
      .then(response => {
        setUserDetails(response.data.data);
        console.log('User Details',response.data)
        setFormData(response.data.data); // Populate form data
      })
      .catch(error => console.error('Error fetching user details:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Update user details in the database
    axios.put('/api/users/meuser', formData)
      .then(response => {
        console.log('User details updated successfully:', response.data);
        toast.success('User Details Updated !! 😎')
        setUserDetails(response.data.data); // Update local state with new details
        setEditMode(false); // Disable edit mode after saving
      })
      .catch(error => console.error('Error updating user details:', error));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <Toaster
                position="top-right"
                reverseOrder={true}
            />
      <HeaderLogout />
      <div className="  w-full max-w-md mt-6">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="username"
              value={userDetails.username}
              readOnly
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              value={userDetails.email}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Verified</label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={userDetails.isVerfied ? 'Yes' : 'No'}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Github Link</label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleInputChange}
              readOnly={!editMode}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Instagram Link</label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="instagramLink"
              value={formData.instagramLink}
              onChange={handleInputChange}
              readOnly={!editMode}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Website Link</label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="websiteLink"
              value={formData.websiteLink}
              onChange={handleInputChange}
              readOnly={!editMode}
            />
          </div>
          <div className="flex items-center justify-between">
            {editMode ? (
              <button
                type="button"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
