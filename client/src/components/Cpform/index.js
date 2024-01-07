import React from 'react'
import './css/index.css'
import Sidebar from './Sidebar'
import Main from './Main'
import './css/index.css';

function index() {
  return (
    <div className='cp-index'>
      <div className='cp-index-content'>
        <Sidebar />
        <Main />
      </div>
    </div>
  )
}

export default index
