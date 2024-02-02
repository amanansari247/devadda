'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const resetPasswordLink = async () => {
        try {
            const res = await axios.post('/api/users/resetpassword', { token, password });
            if (res.data) {
                router.push('/login');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        // Extract token from query params
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        if (tokenParam) {
            setToken(tokenParam);
        }
    }, []);

    return (
        <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">Reset Password</h2>
            <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full py-2 px-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
                onClick={resetPasswordLink}
                className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
                Reset Password
            </button>
        </div>
    );
}
