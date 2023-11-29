import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [auth, setAuth] = useState(true);
  const { isLogin } = useSelector(state => state.auth);
  const [cred, setCred] = useState({ uname: "", email: "", pass: "" });
  const disp = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    isLogin === true ? nav('/') : nav('/auth');
  }, [isLogin])

  return (
    <div className='h-screen flex justify-center items-center snap-x'>
      {
        auth ? <div className="flex justify-center items-center gap-10 snap-center resp-auth">
        <p className='text-right resp-text tracking-tighter bg-gradient-to-r font-black text-6xl'><>Create & Interact<br /> by loggin in</></p>
        <div className="flex flex-col p-5 border border-gray-200 rounded-md justify-center items-start shadow-xl shadow-gray-200">
          <p className="tracking-tighter mb-1 text-sm">Username</p>
          <input type='text' name='uname' onChange={e => setCred({...cred, [e.target.name]: e.target.value})} className="outline-none border border-gray-200 rounded-md p-2 text-sm" placeholder="john doe"/>
          <p className="tracking-tighter mb-1 mt-2 text-sm">Password</p>
          <input type='password' name='pass' onChange={e => setCred({...cred, [e.target.name]: e.target.value})} className="outline-none border border-gray-200 rounded-md p-2 text-sm" placeholder="johndoe1234"/>
          <button onClick={() => disp(login(cred))} className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-800 rounded-md text-white w-full font-semibold tracking-tighter p-2 mt-5">Login</button>
          <div className="flex justify-center items-center w-full cursor-pointer mt-3 text-sm">
          <p onClick={() => setAuth(!auth)}>new here? signup</p>
          </div>
        </div>
        </div> : <div className="flex resp-auth justify-center items-center gap-10 snap-center">
      <p className='text-right tracking-tighter bg-gradient-to-r font-black text-6xl resp-text'><>Create & Interact<br /> by signing in</></p>
      <div className="flex flex-col p-5 border border-gray-200 rounded-md justify-center items-start shadow-xl shadow-gray-200">
        <p className="tracking-tighter mb-1 text-sm">Username</p>
        <input type='text' onChange={e => setCred({...cred, [e.target.name]: e.target.value})} name='uname' className="text-sm outline-none border border-gray-200 rounded-md p-2" placeholder="john doe"/>
        <p className="tracking-tighter mb-1 mt-2 text-sm">Email</p>
        <input type='email' onChange={e => setCred({...cred, [e.target.name]: e.target.value})} name='email' className="text-sm outline-none border border-gray-200 rounded-md p-2" placeholder="johndoe@some.com"/>
        <p className="tracking-tighter mb-1 mt-2 text-sm">Password</p>
        <input type='password' onChange={e => setCred({...cred, [e.target.name]: e.target.value})} name='pass' className="text-sm outline-none border border-gray-200 rounded-md p-2" placeholder="johndoe1234"/>
        <button onClick={() => disp(register(cred))} className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-800 rounded-md text-white w-full font-semibold tracking-tighter p-2 mt-5">Sign Up</button>
        <div className="flex justify-center items-center w-full cursor-pointer mt-3 text-sm">
          <p onClick={() => setAuth(!auth)}>already a user? login</p>
          </div>
      </div>
      </div>
      }
    </div> 
  )
}
