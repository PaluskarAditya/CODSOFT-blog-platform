import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addComment, getComments, remComment } from '../features/commentSlice';

export default function BlogPost() {
  const params = useParams();
  const { username, name, _id } = useSelector(state => state.auth.user);
  const { isLogin } = useSelector(state => state.auth);
  const comments = useSelector(state => state.comment);
  const { id } = params;
  const [blog, setBlog] = useState({});
  let p1, p2, p3;
  const { text } = blog;
  const [comm, setComm] = useState('');
  const [allComm, setAllComm] = useState([]);
  const disp = useDispatch();

  useEffect(() => {
    const getBlog = async () => {
      const res = await fetch(`https://blogplatformbackend.onrender.com/api/getblog/${id}`, { mode: "cors" });
      const data = await res.json();
      disp(getComments(data._id));
      setBlog(data);
    }
    getBlog();
  }, [])

  useEffect(() => {
    setAllComm(comments);
  }, [comments])

  const handleComment = () => {
    const comment = {
      user: _id,
      blog: blog._id,
      comm: comm,
      username: username
    }
    disp(addComment(comment));
    setComm('');
  }

  const partLength = text?.length / 3;
  p1 = text?.substring(0, partLength);
  p2 = text?.substring(partLength, 2 * partLength);
  p3 = text?.substring(2 * partLength);

  return (
    <div className='flex flex-col p-5'>
      <h1 className='font-bold text-4xl tracking-tighter'>{blog?.title}</h1>
      <div className='flex flex-col gap-5'>
        <p className='tracking-tighter mt-5'><span className='font-bold text-2xl uppercase'>{p1?.slice(0, 1)}</span>{p1?.slice(1,)}...</p>
        <div>
          <img src={blog?.img1} className="rounded-md" />
        </div>
        <p>{p2}...</p>
        <p>{p3}</p>
      </div>
      <p className='text-md font-medium tracking-tighter mt-5'>~ By {blog.author}</p>
      <div className='bg-gray-100 p-5 mt-5 rounded-md shadow-xl shadow-gray-300 flex flex-col'>
        <h1 className='tracking-tighter font-bold text-xl'>Comments</h1>
        {isLogin ? <div className='my-2'>
          <p className='text-sm tracking-tighter'>Post a comment</p>
          <div className='flex gap-2 mt-2'>
            <input value={comm} onChange={e => setComm(e.target.value)} type='text' className='text-sm outline-none rounded-md p-1 w-full px-2' placeholder='write a comment...' />
            <button className='text-sm bg-orange-600 text-white p-2 rounded-md' onClick={handleComment}>post</button>
          </div>
        </div> : <p className='font-medium tracking-tighter'>Login to post comments</p>}
        <div className='mt-5 flex flex-col gap-2'>
          {allComm.length > 0 ? allComm.map(el => <div key={el._id} className='bg-white p-2 flex justify-between items-center rounded-md'>
            <div className='flex flex-col'>
              <p className='text-sm tracking-tighter m-0'>@{el.username}</p>
              <p className='text-sm text-gray-500 m-0'>{el.comment}</p>
            </div>
            <button onClick={() => disp(remComment(el._id))}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>) : <p className='font-medium tracking-tighter'>no comments</p>}
        </div>
      </div>
    </div>
  )
}
