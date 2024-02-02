'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import HeaderLogout from '@/components/shared/HeaderLogout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function PostbyId({ params }) {
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const id = params.id;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.post('/api/users/postbyid', { id });
                setPost(response.data.body.projects);
                setUser(response.data.body.user);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <HeaderLogout />
            <div className="bg-white rounded-md shadow-md p-8 max-w-lg w-full">
                {user && (
                    <div className="mb-4 flex items-center">
                        <Image src={user.isAdmin ? '/assets/images/admin.png' : '/assets/images/user.png'} alt="profile pic" width={40} height={40} className="w-10 h-10 rounded-full mr-4" />
                        <h2 className="text-xl font-semibold mr-4">
                            {user.username} {user.isAdmin && (
                                <span className="relative">
                                    <FontAwesomeIcon icon={faCheck} size="sm" className="text-blue-500 cursor-pointer" />
                                    <span className="tooltip absolute bg-gray-800 text-white px-2 py-1 rounded-md bottom-8 left-8 opacity-0 pointer-events-none transition-opacity duration-300">Owner</span>
                                </span>
                            )}
                        </h2>
                        {user.githubLink && (
                            <a href={user.githubLink} target="_blank" rel="noopener noreferrer" className="mr-2">
                                <FontAwesomeIcon icon={faGithub} size="lg" className="text-gray-600 hover:text-gray-800" />
                            </a>
                        )}
                        {user.websiteLink && (
                            <a href={user.websiteLink} target="_blank" rel="noopener noreferrer" className="mr-2">
                                <FontAwesomeIcon icon={faGlobe} size="lg" className="text-gray-600 hover:text-gray-800" />
                            </a>
                        )}
                        {user.instagramLink && (
                            <a href={user.instagramLink} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="lg" className="text-gray-600 hover:text-gray-800" />
                            </a>
                        )}
                    </div>
                )}
                {post ? (
                    <div>
                        <img src={post.imageUrl} alt={post.tittle} className="w-full h-auto mb-4 rounded-lg" />
                        <h2 className="text-xl font-semibold mb-2">{post.tittle}</h2>
                        <p className="text-sm text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: `Description: ${post.description.replace(/\n/g, "<br>")}` }} />
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">{post.category}</p>
                            {post.link && <a href={post.link} className="text-blue-500 hover:underline" target='_Blank'>View Project</a>}
                        </div>
                    </div>
                ) : (
                    <p className="text-lg text-gray-600">Loading...</p>
                )}
            </div>
        </div>
    );
}
