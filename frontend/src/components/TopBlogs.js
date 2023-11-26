import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function TopBlogs() {
  const [blogs, setBlogs] = useState([{ img1: "", text: "" }, { img1: "", text: "" }, { img1: "", text: "" }, { img1: "", text: "" }, { img1: "", text: "" }])

  useEffect(() => {
    const getRandomBlog = async () => {
      const res = await fetch('http://localhost:8080/api/blogs/random/5');
      const data = await res.json();
      setBlogs(data);
    }
    getRandomBlog();
  }, []);

  return (
    <div className='p-5 flex gap-5'>
      <div className='flex flex-col flex-[3]'>
        <h1 className='text-3xl font-bold tracking-tighter mb-3'>Featured blogs</h1>
        <Link to={`/explore/${blogs[0]?._id}`}>
          <div className='rounded-md border cursor-pointer shadow-lg shadow-gray-100 border-gray-200 flex-col h-max'>
            <div className='overflow-hidden rounded-t-md bg-gray-200'>
              <img src={blogs ? blogs[0].img1 : '/hero.jpg'} className='hover:scale-105 z-0 rounded-t-md h-[400px] w-full object-cover transition' loading='lazy' />
            </div>
            <div className='p-3 z-10 flex flex-col'>
              <h1 className='text-2xl font-medium tracking-tighter'>{blogs ? blogs[0].title : 'Top 5 underwater facts you did not know about'}</h1>
              <p className='text-sm mt-1 text-gray-400'>{blogs ? blogs[0].text.slice(0, 80) : 'this is some random description i dont know about what i am writing but i am writing this just to fill this big blogpost'}...</p>
              <div className='mt-3 flex items-center justify-between'>
                <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className='text-gray-400 text-xs'>121K</p>
                </div>
                <p className="text-xs text-gray-400">By {blogs[0].author}</p>
              </div>
            </div>
          </div>
        </Link>
        <div className='h-44 mt-5 bg-gradient-to-r shadow-lg shadow-gray-100 from-cyan-500 via-blue-600 to-blue-300 flex-col rounded-md flex justify-center items-center'>
          <h1 className='text-white font-bold tracking-tighter text-3xl'>login to post blogs</h1>
          <Link to={'/auth'}><button className='bg-black tracking-tighter text-sm text-white rounded-md p-2 px-5 mt-3 shadow-md shadow-black/20'>login</button></Link>
        </div>
        <Link to={`/explore/${blogs[1]?._id}`}>
          <div className='rounded-md border cursor-pointer shadow-lg shadow-gray-100 border-gray-200 overflow-hidden flex-col h-max mt-5'>
            <div className='overflow-hidden bg-gray-200 rounded-t-md'>
              <img src={blogs ? blogs[1].img1 : '/hero-blog2.jpg'} className='hover:scale-105 z-0 rounded-t-md h-[400px] w-full object-cover transition' loading='lazy' />
            </div>
            <div className='p-3 z-10 flex flex-col'>
              <h1 className='text-2xl font-medium tracking-tighter'>{blogs ? blogs[1].title : 'Food items you need to avoid to be healthy'}</h1>
              <p className='text-sm mt-1 text-gray-400'>{blogs ? blogs[1].text.slice(0, 80) : 'this is some random description i dont know about what i am writing but i am writing this just to fill this big blogpost'}......</p>
              <div className='mt-3 flex items-center justify-between'>
                <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className='text-gray-400 text-xs'>65K</p>
                </div>
                <p className="text-xs text-gray-400">By {blogs[1].author}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className='grid grid-cols-1 flex-1 gap-5 h-max mt-1'>
        <h1 className='font-bold tracking-tighter mb-[-10px] text-2xl'>random blogs</h1>
        <Link to={`/explore/${blogs[2]?._id}`}><div className='border shadow-md shadow-gray-100 border-gray-200 rounded-md overflow-hidden h-max'>
          <div className='overflow-hidden bg-gray-200 rounded-t-md'>
            <img src={blogs ? blogs[2].img1 : '/blog2.jpg'} className='hover:scale-105 z-0 rounded-t-md h-[13vw] w-full object-cover transition' loading='lazy' />
          </div>
          <div className='flex flex-col p-2'>
            <p className='text-md tracking-tighter'>{blogs ? blogs[2].title : 'Best places to explore in summer'}</p>
            <p className='text-xs text-gray-400'>{blogs ? blogs[2].text.slice(0, 40) : 'this is some random description i dont know about'}...</p>
            <div className='mt-3 flex items-center justify-between'>
                <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className='text-gray-400 text-xs'>5.3K</p>
                </div>
                <p className="text-xs text-gray-400">By {blogs[2].author}</p>
              </div>
          </div>
        </div></Link>
        <Link to={`/explore/${blogs[3]?._id}`}><div className='border shadow-md shadow-gray-100 border-gray-200 rounded-md overflow-hidden h-max'>
          <div className='overflow-hidden bg-gray-200 rounded-t-md'>
            <img src={blogs ? blogs[3].img1 : '/blog3.jpg'} className='hover:scale-105 z-0 rounded-t-md h-[13vw] w-full object-cover transition' loading='lazy' />
          </div>
          <div className='flex flex-col p-2'>
            <p className='text-md tracking-tighter'>{blogs ? blogs[3].title : 'This underwater place is mysterious'}</p>
            <p className='text-xs text-gray-400'>{blogs ? blogs[3].text.slice(0, 40) : 'this is some random description i dont know about'}...</p>
            <div className='mt-3 flex items-center justify-between'>
                <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className='text-gray-400 text-xs'>40K</p>
                </div>
                <p className="text-xs text-gray-400">By {blogs[3].author}</p>
              </div>
          </div>
        </div></Link>
        <Link to={`/explore/${blogs[4]?._id}`}><div className='border border-gray-200 shadow-md shadow-gray-100 rounded-md overflow-hidden h-max'>
          <div className='overflow-hidden bg-gray-200 rounded-t-md'>
            <img src={blogs ? blogs[4].img1 : '/blog4.jpg'} className='hover:scale-105 z-0 rounded-t-md h-[13vw] w-full object-cover transition' loading='lazy' />
          </div>
          <div className='flex flex-col p-2'>
            <p className='text-md tracking-tighter'>{blogs ? blogs[4].title : 'you need to do these things before 2024'}</p>
            <p className='text-xs text-gray-400'>{blogs ? blogs[4].text.slice(0, 40) : 'this is some random description i dont know about'}...</p>
            <div className='mt-3 flex items-center justify-between'>
                <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className='text-gray-400 text-xs'>1.1K</p>
                </div>
                <p className="text-xs text-gray-400">By {blogs[4].author}</p>
              </div>
          </div>
        </div></Link>
        <button className='flex justify-center items-center'>
          <Link to={'/explore'}><p className='text-gray-400 text-sm'>explore all blogs</p></Link>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 text-gray-400 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}
