'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import HeaderLogout from '@/components/shared/HeaderLogout';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
    const router = useRouter();
    const [post, setPost] = useState({
        tittle: '',
        description: '',
        image: null,
        imageUrl: '',
        projectLink: '',
        category: '',
    });
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { tittle, description, image, imageUrl, projectLink, category } = post;
            const postData = {
                tittle,
                description,
                image,
                imageUrl,
                projectLink,
                category,
            };
            const res = await axios.post('/api/users/create', postData);
           
            console.log('Post created', res.data);

            toast.success('Post created successfully');
            router.push('/profile')
        } catch (error) {
            console.error('Post creation failed', error.message);
            toast.error('Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPost({ ...post, image: file, imageUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    // Check if all required fields are filled to enable the button
    useEffect(() => {
        const { tittle, description, image, projectLink, category } = post;
        const allFieldsFilled = tittle && description && image && projectLink && category;
        setButtonDisabled(!allFieldsFilled);
    }, [post]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-10 sm:p-24">
            <Toaster position="top-right" reverseOrder={true} />
            <HeaderLogout />
            <div className="p-6 sm:p-0 container absolute sm:relative  mt-12  sm:mt-0">
                <h1 className="text-2xl font-bold mt-8 mb-4">Create a New Post</h1>
                <div className="mb-4">
                    <label htmlFor="tittle" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="tittle"
                        name="tittle"
                        value={post.tittle}
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={post.description}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        style={{ whiteSpace: 'pre-wrap' }}                     
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {post.imageUrl && (
                        <img src={post.imageUrl} alt="Preview" className="mt-2 h-32 object-cover" />
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="projectLink" className="block text-sm font-medium text-gray-700">
                        Project Link
                    </label>
                    <input
                        type="url"
                        id="projectLink"
                        name="projectLink"
                        value={post.projectLink}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={post.category}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="App Development">App Development</option>
                        {/* Add more options for different technologies */}
                    </select>
                </div>
            </div>
            <button
                type="button"
                onClick={handleSubmit}
                className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading || buttonDisabled ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                disabled={loading || buttonDisabled}
            >
                {loading ? 'Creating...' : 'Create Post'}
            </button>
        </div>
    );
}
