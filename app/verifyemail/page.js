"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
        } catch (error) {
            setError(true);
           
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            
            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Token is Expired or Email is Verified</h2>
                    
                </div>
            )}
        </div>
    )

}