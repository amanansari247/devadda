import React from 'react'

export default function userprofile({params}) {
  return (
    <div className=' flex flex-col justify-center items-center'>Profile
    <hr/>
    <p className=' text-4xl'> Profile Page {params.id}</p>
    
    </div>
    

  )
}
