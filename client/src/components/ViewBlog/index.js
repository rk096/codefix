import React, { useEffect, useState } from 'react'
import Sidebar from '../Cpform/Sidebar'
import MainBlog from './MainBlog'
import './index.css';
import { useParams} from 'react-router-dom';


function Index() {

  const {id} = useParams();

  return (
    <div className='cp-index'>
      <div className='cp-index-content'>
        <Sidebar />
        <MainBlog id={id}/>
      </div>
    </div>
  )
}

export default Index
