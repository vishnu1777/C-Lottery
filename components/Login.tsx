import React from 'react'
import { useMetamask } from '@thirdweb-dev/react'
type Props = {}

function Login({}: Props) {
  const connnectWithMetamask = useMetamask()
  return (
    <div className='bg-[#091B18] min-h-screen flex flex-col items-center justify-center text-center'>
      <div className='flex flex-col items-center mb-10'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq8N3dSWad5RKfCiLsW70dLYbs88dwOuRUgg&usqp=CAU" alt="logo"
        className='rounded-full h-56 w-56 mb-10'
        />
        <h1 className='text-6xl text-white font-bold '>C-Lottery Draw</h1>
        <h2 className='text-white py-2 '>Get Started By Logging In With Your Metamask</h2>
        <button
        onClick={connnectWithMetamask} 
        className='bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-bold'>
          Log In With Metamask
        </button>
      </div>
    </div>
  )
}

export default Login