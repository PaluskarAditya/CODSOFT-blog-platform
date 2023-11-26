import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='flex shadow-gray-300 shadow-md items-center justify-between p-5 bg-gradient-to-r from-blue-500 from-40% to-blue-800 text-white gap-[150px]'>
      <ul className='flex items-center justify-between gap-5'>
        <li>
          <Link to="/" className='text-2xl font-bold tracking-tighter'>Blog</Link>
        </li>
        <li>
          <a href="" className='text-sm tracking-tighter'>about</a>
        </li>
        <li>
          <Link to={'/explore'} className='text-sm tracking-tighter'>explore</Link>
        </li>
      </ul>
      <ul className='w-full'>
        <li className='flex w-full'>
          <input placeholder='search blogs' className='w-full text-black p-2 outline-none text-sm rounded-l-md' />
          <button className='p-2 px-3 bg-gray-700 rounded-r-md'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </li>
      </ul>
      <ul>
        <li>
          <Link to={'/auth'}><button className='text-sm tracking-tighter p-2 px-3 rounded-md bg-gray-700'>Login</button></Link>
        </li>
      </ul>
    </nav>
  )
}
