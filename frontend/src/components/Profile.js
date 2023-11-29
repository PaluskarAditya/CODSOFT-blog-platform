import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { update } from '../features/authSlice';

export default function Profile() {
  const param = useParams();
  const [userBlogs, setBlogs] = useState([]);   
  const [img, setImg] = useState('')
  const { id } = param;
  const { isLogin } = useSelector(state => state.auth);
  const { username, name, email, _id } = useSelector(state => state.auth.user);
  const nav = useNavigate();
  const [blog, setBlog] = useState({ id: "", img1: "", text: "", title: "" });
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({ id: id, username: username, name: name, email: email });
  const disp = useDispatch();

  const handleUpdate = async (id) => {
    const res = await fetch(`https://blogplatformbackend.onrender.com/api/blogs/update/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": JSON.parse(localStorage.getItem('token'))
      },
      body: JSON.stringify({
        img1: blog.img1,
        text: blog.text,
        title: blog.title
      })
    });
    const data = await res.json();
    alert('Your blog is updated successfully');
  }

  useEffect(() => {
    isLogin === false && nav('/auth');
  }, [isLogin]);

  useEffect(() => {
    const getUserBlogs = async () => {
      const res = await fetch(`https://blogplatformbackend.onrender.com/api/blogs/${_id}`, {
        method: "GET",
        headers: {
          "Authorization": JSON.parse(localStorage.getItem('token'))
        }
      });
      const data = await res.json();
      setBlogs(data);
    }

    getUserBlogs();
  }, [])

  const handleImageUpdate = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setBlog({...blog, img1: reader.result});
    }
  }

  return (
    <div className='flex-col mt-[-76px] flex justify-center items-center p-5'>
      {edit ? <div className='fixed top-0 left-0 bottom-0 right-0 backdrop-blur-sm h-screen flex justify-center items-center p-10'>
        <div className='bg-white p-5 rounded-md shadow-xl shadow-black/20'>
          <div className='flex justify-between items-center w-full'>
            <h1 className='font-medium tracking-tighter text-lg'>Edit modal</h1>
            <button onClick={() => setEdit(false)}>x</button>
          </div>
          <div className='flex flex-col'>
            <div className='w-full mt-3'>
              <img src={blog.img1} className='rounded-md object-cover max-h-[200px]' />
            </div>
            <div className='flex'>
              <label htmlFor='file' className='p-1 border border-gray-200 rounded-md mt-2 text-sm tracking-tighter w-full text-center cursor-pointer'>choose new image</label>
              <input type='file' id='file' className='hidden' onChange={handleImageUpdate} />
            </div>
            <div className='flex flex-col mt-3'>
              <p className='text-md font-medium tracking-tighter mt-3'>Title</p>
              <input name='title' className='border border-gray-200 rounded-md p-2 text-sm outline-none mb-2' onChange={e => setBlog({ ...blog, [e.target.name]: e.target.value })} value={blog.title} />
              <p className='text-md font-medium tracking-tighter'>Description</p>
              <textarea name='text' className='border max-h-[130px] min-h-[70px] border-gray-200 rounded-md p-2 text-sm outline-none mb-2' onChange={e => setBlog({ ...blog, [e.target.name]: e.target.value })} value={blog.text} />
            </div>
          </div>
          <div className='flex w-full gap-3 mt-3'>
            <button className='w-full bg-gradient-to-r from-gray-200 to-gray-400 text-sm tracking-tighter p-2 rounded-md' onClick={() => {handleUpdate(blog.id); setEdit(false)}}>update</button>
          </div>
        </div>
      </div> : ""}
      <div className='flex flex-col mt-[76px] gap-10'>
        <h1 className='font-black text-3xl tracking-tighter text-left'>Your profile</h1>
        <div className='flex-1 max-[390px]:flex-col flex gap-10'>
          <div>
            <img src={isLogin ? '/prof.png' : ""} alt='profile' className='rounded-full border border-gray-300' />
          </div>
          <div className='flex flex-col justify-center items-start'>
            <p className="tracking-tighter mb-1 text-md mt-3">name</p>
            <input value={user.name} type='text' name='name' onChange={e => setUser({...user, [e.target.name]: e.target.value})} className="outline-none border border-gray-200 rounded-md p-2 text-sm" placeholder="john doe" />
            <p className="tracking-tighter mb-1 text-md mt-3">username</p>
            <input value={user?.username} type='text' name='username' onChange={e => setUser({...user, [e.target.name]: e.target.value})} className="outline-none border border-gray-200 rounded-md p-2 text-sm" placeholder="john doe" />
            <p className="tracking-tighter mb-1 text-md mt-3">email</p>
            <input value={user.email} disabled type='text' name='email' onChange={e => setUser({...user, [e.target.name]: e.target.value})} className="outline-none border border-gray-200 rounded-md p-2 text-sm" placeholder="john doe" />
            <button className='text-sm bg-blue-600 w-full rounded-md mt-5 text-white p-2' onClick={() => disp(update(user))}>save</button>
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-[90px] justify-center items-start'>
        <h1 className='font-black text-3xl tracking-tighter text-left'>Your blogs</h1>
        <div className='flex flex-col gap-5 w-full mt-5'>
          {
            userBlogs ? userBlogs.map(el => <div key={el._id} className='flex max-[390px]:flex-col border border-gray-200 rounded-md'>
              <div className='flex-1'>
                <img src={el.img1} className='h-full max-[390px]:h-[200px] w-full object-cover' />
              </div>
              <div className='flex-[2] flex flex-col gap-0 p-3 justify-center items-start'>
                <h1 className='tracking-tighter font-medium'>{el.title}</h1>
                <p className='text-sm tracking-tighter'>{el.text.slice(0, 200)}...</p>
                <div className='flex w-full gap-5 mt-3'>
                  <button className='w-full bg-gradient-to-r from-gray-200 to-gray-400 text-sm tracking-tighter p-2 rounded-md' onClick={() => {setEdit(true); setBlog({ img1: el.img1, text: el.text, title: el.title, id: el._id})}}>edit</button>
                  <button className='w-full bg-gradient-to-l from-gray-200 to-gray-400 text-sm tracking-tighter p-2 rounded-md'>delete</button>
                </div>
              </div>
            </div>) : <h1>No blogs found</h1>
          }
        </div>
      </div>
    </div>
  )
}
