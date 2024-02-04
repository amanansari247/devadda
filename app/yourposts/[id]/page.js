'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeaderLogout from '@/components/shared/HeaderLogout';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import DeleteModal from '@/components/shared/DeleteModal';

export default function ProjectPage({ params }) {
    const router = useRouter();
    const [post, setPost] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        tittle: '',
        description: '',
        imageUrl: '',
        link: '',
        category: '',
    });

    const id = params.id;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.post('/api/users/postbyid', { id });
                setPost(response.data.body.projects);
                setFormData(response.data.body.projects); // Populate form data
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleDeleteConfirmation = async () => {
        try {
            await axios.delete('/api/users/postbyuser', { data: { id } });
            toast.success('Post deleted 😁');
            setTimeout(() => {
                router.push('/yourposts');
            }, 1000);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    
    const handleDelete = () => {
        setIsModalOpen(true); // Open the modal when delete button is clicked
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imageUrl") {
            const reader = new FileReader();
            reader.onload = function () {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: reader.result
                }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSave = () => {
        // Update project details in the database
        axios.put('/api/users/postbyuser', { formData, id })
            .then(response => {
                toast.success('Project Details Updated !! 😎')
                setPost(response.data.data); // Update local state with new details
                setEditMode(false); // Disable edit mode after saving
            })
            .catch(error => console.error('Error updating project details:', error));
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
            <Toaster position="top-right" reverseOrder={true} />
            <HeaderLogout />
            <div className="w-full max-w-md mt-6">
                <h1 className="text-3xl font-bold mb-4">Project Details</h1>

                <div className="mb-4">
                 
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="tittle" 
                            value={formData.tittle }
                            readOnly={!editMode}
                            onChange={handleInputChange}
                        />
                    </div>

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="description"
                        value={formData.description }
                        readOnly={!editMode}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                    {editMode ? (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                name="imageUrl"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={handleInputChange}
                            />
                            {formData.imageUrl && (
                                <img src={formData.imageUrl} alt="Project" className="mt-2 max-w-full h-auto" />
                            )}
                        </>
                    ) : (
                        <img src={post.imageUrl} alt="Project" className="mt-2 w-20 h-20 " />
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <input
                        type="text"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="category"
                        value={formData.category || ''}
                        readOnly={!editMode}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Link</label>
                    <input
                        type="text"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="link"
                        value={formData.link || ''}
                        readOnly={!editMode}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex items-center justify-between">
                    {editMode ? (
                        <>
                            <button
                                type="button"
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                                onClick={() => setEditMode(false)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <><button
                                type="button"
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => setEditMode(true)}
                            >
                                Edit
                            </button><button
                                type="button"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleDelete}
                            >
                                    Delete
                                </button>
                                </>
                        
                    )}
                </div>
            </div>
            <DeleteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleDeleteConfirmation}
        />
        </div>
    );
}
