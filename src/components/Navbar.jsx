import React from 'react'
import { CiWallet } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className='flex justify-start items-center gap-3 font-poppins p-10'>
        <CiWallet  className='w-15 h-15 text-blue-700'/>
        <p className='font-bold text-3xl'>Expenses</p>
    </div>
  )
}

export default Navbar