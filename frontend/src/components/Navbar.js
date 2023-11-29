import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, logout } from '../features/authSlice';

export default function Navbar() {
  const { isLogin } = useSelector(state => state.auth);
  const { username, id } = useSelector(state => state.auth.user);
  const [navToggle, setNav] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [toggle, setTog] = useState(false)
  const [opt, setOpt] = useState(false);
  const disp = useDispatch();
  const nav = useNavigate();
  const toggleNav = () => {
    if (!toggle) {
      setTog(true);
      document.getElementById('nav').classList.remove('hidden');
      document.getElementById('nav').classList.add('flex');
    } else {
      setTog(false)
      document.getElementById('nav').classList.add('hidden');
      document.getElementById('nav').classList.remove('flex');
    }
  }

  return (
    <nav className='flex max-[390px]:items-start resp-nav-wrapper shadow-gray-300 shadow-md items-center justify-between px-5 py-2 bg-gradient-to-r from-blue-500 from-40% to-blue-800 text-white'>
      <ul className='flex items-center justify-between gap-5 resp-nav-wrapper'>
        <li>
          <Link to="/" className='text-2xl font-bold tracking-tighter'>Blog</Link>
        </li>
        {/* <li className='flex w-full'>
          <input placeholder='search blogs' className='w-full text-black p-2 outline-none text-sm rounded-l-md' />
          <button className='p-2 px-3 bg-gray-700 rounded-r-md h-max'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </li> */}
      </ul>
      <ul className='resp-nav ml-5 flex flex-col justify-center items-end relative'>
        <button className='bg-gray-700 p-2 rounded-md' onClick={() => setNav(!navToggle)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        {navToggle ? <div className='flex flex-col justify-center items-end mt-2'>
          <li className='text-sm p-1 tracking-tighter font-light'>about</li>
          <li className='text-sm p-1 tracking-tighter font-light' onClick={() => setNav(false)}><Link to={'/explore'} >explore</Link></li>
          {isLogin ? <><li className='text-sm tracking-tighter p-1' onClick={() => setOpt(!opt)}>{username}</li>{opt ? <div className='z-50 flex flex-col justify-center items-end bg-blue-900 p-1 px-3 rounded-md absolute top-[130px]'>
            <li className='text-right text-sm p-1 hover:bg-blue-900/70 transition' onClick={() => setNav(false)}><Link to={'/create-blog'}>Create</Link></li>
            <li className='text-right text-sm p-1 hover:bg-blue-900/70 transition' onClick={() => setNav(false)}><Link to={`/profile/${id}`}>Profile</Link></li>
            <li className='text-right text-sm p-1 hover:bg-blue-900/70 transition' onClick={() => { disp(logout()); nav('/auth'); setNav(!navToggle) }}>Logout</li>
          </div> : "" }</> : <li className='text-sm p-1 tracking-tighter font-light' onClick={() => setNav(false)}><Link to={'/auth'}>Login</Link></li>}
        </div> : ""}
      </ul>
      <ul className='relative ml-10 z-99 flex justify-between items-center gap-3 norm-nav'>
        <li>
          <a href="" className='text-sm tracking-tighter'>about</a>
        </li>
        <li>
          <Link to={'/explore'} className='text-sm tracking-tighter'>explore</Link>
        </li>
        {isLogin ? <li className='text-white'>
          <div className='flex flex-col'>
            <div onClick={() => setOpt(!opt)} className='flex justify-center items-center gap-2 hover:bg-blue-900 p-2 rounded-md transition cursor-pointer'>
              <img src={user ? "/prof.png" : ""} className='h-[40px] w-[40px] rounded-full cursor-pointer' />
              <p className='text-sm'>{username}</p>
            </div>
            {opt ? <div className='bg-blue-800/50 rounded-md absolute top-[60px] right-0 w-full z-50'>
              <ul className='flex flex-col bg-blue-900/50 rounded-md z-50'>
                <li className='p-2 py-2 cursor-pointer text-xs hover:bg-blue-900/70 rounded-md'><Link to={'/create-blog'}>Create</Link></li>
                <li className='p-2 py-2 cursor-pointer text-xs hover:bg-blue-900/70 rounded-md'><Link to={`/profile/${id}`}>Profile</Link></li>
                <li className='p-2 py-2 cursor-pointer text-xs hover:bg-blue-900/70 rounded-md'>Settings</li>
                <li onClick={() => { disp(logout()); nav('/auth') }} className='p-2 py-2 cursor-pointer text-xs hover:bg-blue-900/70 rounded-md flex items-center'>
                  <p>Sign out</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                </li>
              </ul>
            </div> : ""}
          </div>
        </li> : <li>
          <Link to={'/auth'}><button className='text-sm tracking-tighter p-2 px-3 rounded-md bg-gray-700'>Login</button></Link>
        </li>}
      </ul>
    </nav>
  )
}
