'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function ForgetPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const resetPassword = async () => {
        try {
            const res = await axios.post('/api/users/forgetpassword', { email });
            toast.success('Please Check Your Email !!')
            router.push('/checkemail')

            console.log(res);
        } catch (error) {
            toast.error('Email Not Registered !!')
            console.error(error);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
            <h2 className="text-3xl font-bold mb-4">Forget Password</h2>
            <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full py-2 px-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
            />
            <button
                onClick={resetPassword}
                className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
                Reset Password
            </button>
        </div>
    );
}
