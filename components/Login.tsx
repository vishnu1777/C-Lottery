import React from 'react'
import { useMetamask } from '@thirdweb-dev/react'
type Props = {}

function Login({}: Props) {
  const connnectWithMetamask = useMetamask()
  return (
      <div className='bg-[#091B18] h-screen flex justify-center items-center'>
          <div className='flex flex-col items-center mb-10'>
              <img
              className='h-56 mb-10 w-56 rounded-full'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq8N3dSWad5RKfCiLsW70dLYbs88dwOuRUgg&usqp=CAU" alt="MyLogo" />
              <h1 className='text-6xl font-bold text-white '>C-Lottery Draw</h1>
              <p className='text-white text-sm py-2'>Get Started By Logging In With Your Metamask</p>
              <button
              onClick={connnectWithMetamask}
              className='bg-white px-8 py-5 rounded-lg mt-10 font-bold'
              >
                Login With Metamask
              </button>
          </div>
      </div>
  )
}

export default Login