import React, { useEffect, useState } from 'react'
import Sidebar from '../Cpform/Sidebar'
import MainBlog from './MainBlog'
import './index.css';
import { useParams} from 'react-router-dom';
import { getBlogById } from '../../utils/BlogHelper';


function Index() {

  const {id} = useParams();
  const [blog, setBlog] = useState('');

  useEffect (() => {
    const fetchData = async () => {
      try {
          
          const blg = await getBlogById(id);
        // console.log('Fetched blog:', blg);
          setBlog(blg);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  fetchData();
}, [id]);

  //console.log("id", id);

  return (
    <div className='cp-index'>
      <div className='cp-index-content'>
        <Sidebar />
        { blog && (
          <MainBlog blg={blog} />
        )}

      </div>
    </div>
  )
}

export default Index
