
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'




const Header = () => {
  
  
  return (
    <header className=' w-full border-b'>
        <div className=' wrapper flex items-center justify-between'>
         <Link href='/' className=' w-36'>
           <Image
           src="/assets/images/devadda-logo-2.png" width={70} height={50}
           alt='DevAdda logo'
           />
         </Link>
         
          
         
         <div className=' flex w-32 justify-end gap-3'>
           
          
           
         <Link href='/login'>
            <button className=' w-24 border border-purple-300 ' size='lg'>
            
                Login
              
            </button>
            </Link>
         
           
            
         </div>
        </div>
    </header>
  )
}

export default Header