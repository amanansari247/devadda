"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast/headless';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import HeaderLogout from '@/components/shared/HeaderLogout';
import Posts from '@/components/shared/Posts';

export default function Profile() {
  
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loogedin,setloogedin] = useState(true);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    setloogedin(true)
    try {
      const respUser = await axios.get('/api/users/meuser');
    
      setUserData(respUser.data);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout Successful');
      router.push('/');
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-10 sm:p-24">
      <HeaderLogout/>
      
       
        <Posts/>
       
      </div>
  
  );
}
