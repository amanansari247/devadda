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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      const fetchPosts = () => {
          axios.get('/api/users/posts')
              .then(response => {
                  setPosts(response.data.body.projects);
                  setLoading(false);
              })
              .catch(error => {
                  console.error('Error fetching posts:', error);
                  setLoading(false);
              });
      };

      fetchPosts();
  }, []);

  const truncateDescription = (description, maxLength) => {
      if (description && description.length > maxLength) {
          return `${description.slice(0, maxLength)}...`;
      }
      return description;
  };

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
     <button
                        className="bg-purple-500 text-white font-bold py-2 mt-4 px-4 rounded"
                        onClick={logout}
                    >
                        Logout
                    </button>
      
       
      <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">All Posts</h1>
            {loading ? (
                <p className="text-lg text-gray-600">Loading posts...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {posts.map(post => (
                        <Link href={`/posts/${post._id}`} key={post.id}>
                            <div className="bg-white shadow-md rounded-md overflow-hidden">
                                <div className="bg-purple-400 text-white py-1 px-3 rounded-t-md">{post.category}</div>
                                <img src={post.imageUrl} alt={post.title} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">{truncateDescription(post.tittle, 20)}</h2>
                                    <p className="text-sm text-gray-600 mb-2">{truncateDescription(post.description, 80)}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
       
      </div>
  
  );
}
