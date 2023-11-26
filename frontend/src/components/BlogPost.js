import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BlogPost() {
  const params = useParams();
  const { id } = params;
  const [blog, setBlog] = useState({});
  let p1, p2, p3;
  const { text } = blog;

  useEffect(() => {
    const getBlog = async () => {
      const res = await fetch(`http://localhost:8080/api/blogs/${id}`);
      const data = await res.json();
      setBlog(data);
    }
    getBlog();

  }, [])

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
    </div>
  )
}
