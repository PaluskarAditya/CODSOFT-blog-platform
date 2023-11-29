import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Explore() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const res = await fetch('https://blogplatformbackend.onrender.com/api/blogs');
      const data = await res.json();
      setBlogs(data);
    }
    getAll();
  }, [])

  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 resp-explore p-5 gap-5'>
      {
        blogs ? blogs.map(el => <Link to={`/explore/${el._id}`} key={el._id}>
          <div className='border border-gray-200 shadow-md shadow-gray-100 rounded-md overflow-hidden'>
            <div className='overflow-hidden bg-gray-200 rounded-t-md flex-[2]'>
              <img src={el.img1} className='hover:scale-105 resp-img z-0 rounded-t-md h-[15vw] w-full object-cover transition' loading='lazy' />
            </div>
            <div className='flex-1 flex flex-col p-2 justify-center items-start h-[18vh]'>
              <p className='text-md tracking-tighter'>{el.title}</p>
              <p className='text-xs text-gray-400'>{el.text?.slice(0, 40)}...</p>
              <div className='mt-3 flex items-center justify-between w-full'>
                <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className='text-gray-400 text-xs'>{Math.floor(Math.random() * 120)}K</p>
                </div>
                <p className="text-xs text-gray-400">By {el.author}</p>
              </div>
            </div>
          </div>
        </Link>) : "Loading"
      }
    </div >
  )
}
