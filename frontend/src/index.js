import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Explore from './components/Explore';
import BlogPost from './components/BlogPost';
import Auth from './components/Auth';
import { Provider } from 'react-redux';
import store from './features/store';
import CreateBlog from './components/CreateBlog';
import Profile from './components/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/explore/:id' element={<BlogPost />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
