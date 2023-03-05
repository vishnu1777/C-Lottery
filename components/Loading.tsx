import React from 'react'
import { PropagateLoader } from 'react-spinners'
type Props = {}

function Loading({}: Props) {
  return (
    <div className='bg-[#091B18] h-screen flex flex-col justify-center items-center '>
        <div className='flex items-center space-x-2 mb-10'>
          <img 
          className='rounded-full h-20 w-20'
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq8N3dSWad5RKfCiLsW70dLYbs88dwOuRUgg&usqp=CAU" alt="logo" />
          <h1 className='text-lg text-white font-bold'>Loading C-Lottery Draw</h1>
        </div>
        <PropagateLoader color='white' size={30}/>
      </div>
  )
}

export default Loading