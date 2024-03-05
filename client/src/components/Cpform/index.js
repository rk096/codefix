import './css/index.css'
import Sidebar from './Sidebar'
import Main from './Main'
import React, { useState, useEffect } from 'react';
import { getAllQuestions } from '../../utils/QuestionHelper';
import { getAllBlogs } from '../../utils/BlogHelper';

function Index() {

  const [questions, setQuestions] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const questionRes = await getAllQuestions();
        const blogRes = await getAllBlogs();
        setQuestions(questionRes);
        setBlogs(blogRes);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [questions, blogs]);

  return (
    <div className='cp-index'>
      <div className='cp-index-content'>
        <Sidebar />
        <Main question={questions} blog={blogs} />
      </div>
    </div>
  )
}

export default Index
