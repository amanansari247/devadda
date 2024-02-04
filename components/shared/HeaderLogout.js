"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import axios from 'axios'

const HeaderLogout = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logout = async () => {
       
            await axios.get('/api/users/logout').then(
                response => {
                   router.push('/')
                   console.log('user looged in',response);
                   router.refresh()
                }
            ).catch(error => {
                  console.error('Error fetching posts:', error);
                  
              });
    };

    return (
        <header className='w-full border-b'>
            <div className='wrapper flex items-center justify-between'>
                <Link href='/' className='w-36'>
                    <Image
                        src="/assets/images/devadda-logo-2.png" width={70} height={50}
                        alt='DevAdda logo'
                    />
                </Link>
                <div className='md:hidden'>
                    <button
                        className="block text-gray-600 focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>
                <nav className={`md:flex md:items-center space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <ul className=' absolute sm:relative bg-white p-4 sm:p-0 sm:bg-inherit flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4'>
                        <li><Link href='/profile'>Home</Link></li>
                        <li><Link href='/createprojectpost'>Create post</Link></li>
                        <li><Link href='/yourposts'>Your Posts</Link></li>
                        <li><Link href='/profile/user'>Profile</Link></li>
                    </ul>
                </nav>
                <div className='flex w-32 justify-end gap-3  md:block'>
                    <button
                        className="bg-purple-500 text-white font-bold py-2 mt-4 px-4 rounded"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )
}

export default HeaderLogout;
