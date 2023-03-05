import React from 'react'
import NavButton from './NavButton'
import {Bars3BottomRightIcon} from '@heroicons/react/24/solid'
import { useAddress,useDisconnect } from '@thirdweb-dev/react'
import icon from '../assets/icon2.svg'
type Props = {}

const Header = (props: Props) => {
    const address = useAddress()
    const disConnect = useDisconnect()
  return (
    <header className='grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5'>
      <div className='flex items-center space-x-2 '>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq8N3dSWad5RKfCiLsW70dLYbs88dwOuRUgg&usqp=CAU'
       className='rounded-full h-20 w-20'
       alt="my-logo" />
        <div>
            <h1 className='text-lg text-white font-bold'>C-Lottery</h1>
            <p className='text-xs text-emerald-500 truncate'>User:{address?.substring(0,5)}...{address?.substring(address.length,address.length - 5)}</p>
        </div>
        </div>
        <div className='hidden md:flex md:col-span-3 items-center justify-center rounded-md'>
            <div className='bg-[#0A1F1C] p-4 space-x-2'>
                <NavButton isActive title='Buy Tickets'/>
                <NavButton onClick={disConnect} title='Logout' />
            </div>
        </div>
        <div className='flex flex-col ml-auto text-right'>
            <Bars3BottomRightIcon className='h-8 w-8 mx-auto text-white cursor-pointer' />
            <span className='md:hidden'>
            <NavButton onClick={disConnect} title='Logout' />
        </span>
        </div>
       
    </header>
  )
}

export default Header