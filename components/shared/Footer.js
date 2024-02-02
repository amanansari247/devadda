import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center wrappper flex-between flex flex-col gap-4 p-5 text-center
      sm:flex-row
      '>
        <Link href='/'>
          <Image
          src='/assets/images/logo-devadda.png'
          alt='logo'
          width={150}
          height={10}
          />
        </Link>

        <p className='mt-2'> Aman Hussain . All Rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer