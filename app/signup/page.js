'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

export default function Signup() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('/api/users/signup', user);
         
            toast.success('Account Created !! 😎 ');
            router.push('/login');
        } catch (error) {
           
            toast.error('Email or Username Already Taken try Something Else 😢');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email.length > 0 && user.password.length > 0 && user.username.length > 0));
    }, [user]);

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-6" >
                <img
                    className="mx-auto h-10 w-auto"
                    src="/assets/images/devadda-logo-2.png"
                    alt="DevAdda"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign Up to your account
                </h2>
            </div>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>

                <hr className='w-full border-t-2 border-gray-200 mb-6' />
                <label htmlFor='username' className='block text-gray-600'>Username</label>
                <input
                    type='text'
                    id='username'
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder='Username'
                    className='w-full mt-1 p-2 border rounded-md'
                />
                <label htmlFor='email' className='block text-gray-600'>Email</label>
                <input
                    type='email'
                    id='email'
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder='Email'
                    className='w-full mt-1 p-2 border rounded-md'
                />
                <label htmlFor='password' className='block text-gray-600'>Password</label>
                <input
                    type='password'
                    id='password'
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder='Password'
                    className='w-full mt-1 p-2 border rounded-md'
                />
                <button
                    onClick={onSignup}
                    disabled={buttonDisabled}
                    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                >
                    {loading ? 'Signing Up' : 'Signup'}
                </button>
                <p className='text-sm text-gray-600 text-center mt-4'>Already have an account? <Link href='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login here</Link>.</p>
            </div>
        </div>
    );
}
