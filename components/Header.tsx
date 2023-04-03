import React from 'react'
import NavButton from './NavButton'
import {Bars3BottomRightIcon} from '@heroicons/react/24/solid'
import { useAddress,useDisconnect } from '@thirdweb-dev/react'

type Props = {}

const Header = (props: Props) => {
    const address = useAddress()
    const disConnect = useDisconnect()
  return (
      <div className='grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5'>
        <div className='flex items-center space-x-2'>
          <img 
          className='h-20 w-20 rounded-full'
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq8N3dSWad5RKfCiLsW70dLYbs88dwOuRUgg&usqp=CAU" alt="" />
          <div>
          <h2 className='font-bold text-white text-xl'>C-Lottery</h2>
          <p className='text-emerald-500'>{address?.slice(0,5)}...{address?.slice(-5)}</p>
          </div>
         </div>
         <div className='hidden md:flex md:col-span-3 items-center justify-center rounded-md'>
            <div className='bg-[#0A1F1C] p-4 space-x-2'>
            <NavButton isActive title='Buy Tickets'/>
            <NavButton onClick={disConnect} title='Logout' />
            </div>
         </div>
         <div className='flex flex-col text-right ml-auto'>
            <Bars3BottomRightIcon className='h-8 w-8 text-white mx-auto cursor-pointer'/>
            <span className='md:hidden'>
            <NavButton onClick={disConnect} title='Logout' />
          </span>
         </div>
      </div>
  )
}

export default Header