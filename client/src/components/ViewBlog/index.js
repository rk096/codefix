import React from 'react'
import Sidebar from '../Cpform/Sidebar'
import MainBlog from './MainBlog'
import './index.css';

function index() {
  return (
    <div className='cp-index'>
      <div className='cp-index-content'>
        <Sidebar />
        <MainBlog />
      </div>
    </div>
  )
}

export default index
