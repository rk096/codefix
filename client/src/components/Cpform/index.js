import './css/index.css'
import Sidebar from './Sidebar'
import Main from './Main'
import React from 'react';

function Index() {

  return (
    <div className='cp-index'>
      <div className='cp-index-content'>
        <Sidebar />
        <Main />
      </div>
    </div>
  )
}

export default Index
