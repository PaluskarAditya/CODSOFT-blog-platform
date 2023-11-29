import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateBlog() {
  const [img, setImg] = useState('');
  const { username } = useSelector(state => state.auth.user)
  const [blog, setBlog] = useState({ title: "", text: "", desc: "", img1: "", category: "" });
  const nav = useNavigate();

  const handleUpload = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      var str = reader.result;
      setImg(str);
      setBlog({...blog, img1: reader.result});
    }
  }

  const handlePost = async () => {
    const res = await fetch('https://blogplatformbackend.onrender.com/api/blogs/create', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": JSON.parse(localStorage.getItem('token'))
      },
      body: JSON.stringify({
        "author": username,
        "text": blog.text,
        "title": blog.title,
        "img1": blog.img1,
        "category": "temp"
      })
    });
    const data = await res.json();
    console.log(data);  
    nav('/');
  }

  return (
    <div className='h-screen mt-[-76px] flex gap-5 max-[390px]:gap-3 max-[390px]:flex-col'>
      <div className='p-5 pr-0 max-[390px]:p-5 flex mt-[75px] flex-col flex-1 justify-start items-start'>
        <p className='text-medium text-lg'>Title</p>
        <input value={blog.title} onChange={e => setBlog({...blog, [e.target.name]: e.target.value})} name='title' type='text' placeholder='enter blog title' className='w-full mt-2 border border-gray-200 rounded-md outline-none p-2 text-lg' />
        <p className='text-medium text-lg mt-3'>Description</p>
        <textarea value={blog.text} onChange={e => setBlog({...blog, [e.target.name]: e.target.value})} name='text' placeholder='enter blog description...' className='mt-2 border border-gray-200 rounded-md outline-none p-2 text-lg max-h-full min-h-[70%] h-full w-full' />
      </div>
      <div className='p-5 pl-0 flex mt-[75px] max-[390px]:mt-[30px] max-[390px]:p-5 flex-col flex-1 justify-start items-center'>
        <div className='bg-gray-100 w-full rounded-md p-5 flex justify-center items-center h-full relative'>
          {
            !img ? <label htmlFor='file'>Choose image</label> : ""
          }
          <input type='file' id='file' className='hidden' onChange={handleUpload} />
          {
            img ? <img src={img ? img : ""} className='h-full w-full rounded-md object-cover' /> : ""
          }
          {
            img ? <button className='absolute top-1 right-1' onClick={() => setImg('')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button> : ""
          }
        </div>
        <div className="mt-5 w-full">
          <button onClick={handlePost} className='w-full rounded-md p-2 text-md font-medium tracking-tighter bg-gradient-to-r from-blue-600 to-blue-800 text-white'>
            create post
          </button>
        </div>
      </div>
    </div>
  )
}
