import React from 'react'
import Sidebar from '../Cpform/Sidebar'
import MainQuestion from './MainQuestion'
import './index.css';

function index() {
  return (
    <div className='cp-index'>
      <div className='cp-index-content'>
        <Sidebar />
        <MainQuestion />
      </div>
    </div>
  )
}

export default index
