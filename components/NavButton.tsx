import React from 'react'

type Props = {
  title:string,
  isActive?:boolean,
  onClick?:()=>void  
}

function NavButton({title,isActive,onClick}: Props) {
  return (
    <button
    onClick={onClick}
    className={`${isActive && 'bg-[#036756]'} hover:bg-[#036756] py-2 px-4 font-bold rounded-md text-white `}
    >
    {title}
    </button>
  )
}

export default NavButton