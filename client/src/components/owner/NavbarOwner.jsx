import React from 'react'

// ✅ fixed assets import
import { Link } from 'react-router-dom'
import {  assets } from '../../assets/assets'
import { useAppContext } from '../../context/Appcontext'

const NavbarOwner = () => {
  const {user} = useAppContext()

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-600 border-b border-borderColor shadow-sm'>
      <Link to='/'>
        <img src={assets.logo} alt="Brand Logo" className='h-7' />
      </Link>

      <p className='text-sm md:text-base font-medium'>
        Welcome, <span className='text-primary'>{user?.name || "Owner"}</span>
      </p>
    </div>
  )
}

export default NavbarOwner
