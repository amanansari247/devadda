'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/users/posts');
                console.log(response)
                setPosts(response.data.body.projects);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
        }
        return description;
    };

    return (
        
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">All Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {posts.map(post => (
                    <Link href={`/posts/${post._id}`}>
                    <div key={post.id} className="bg-white shadow-md rounded-md overflow-hidden">
                        <div className="bg-purple-400 text-white py-1 px-3 rounded-t-md">{post.category}</div>
                        <img src={post.imageUrl} alt={post.tittle} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-2">{post.tittle}</h2>
                            <p className="text-sm text-gray-600 mb-2">{truncateDescription(post.description, 100)}</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
