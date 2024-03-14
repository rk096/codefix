import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AllQuestions from './AllQuestions';
import './css/main.css';
import { AuthContext } from '../../App';
import AllBlogs from './AllBlog';
import { Button } from '@mui/material';
import { getAllQuestions } from '../../utils/QuestionHelper';
import { getAllBlogs } from '../../utils/BlogHelper';

function Main() {

  const user = useContext(AuthContext);
  const location = useLocation();
  const isBlogRoute = location.pathname === "/blogs";

  const [questions, setQuestions] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [latestOrderQue, setLatestOrderQue] = useState('random');
  const [latestOrderBlg, setLatestOrderBlg] = useState('random');
  const [voteOrderQue, setVoteOrderQue] = useState('random');
  const [voteOrderBlg, setVoteOrderBlg] = useState('random');
  const [answeredOrderQue, setAnsweredOrderQue] = useState('random');
  const [viewOrderBlg, setViewOrderBlg] = useState('random');

  // questions filter
  const handleLatestOrderQue = () => {
    if (latestOrderQue === 'random') {
      setAnsweredOrderQue('random');
      setVoteOrderQue('random');
      setLatestOrderQue('asc');
    } else if (latestOrderQue === 'asc') {
      setAnsweredOrderQue('random');
      setVoteOrderQue('random');
      setLatestOrderQue('desc');
    } else {
      setLatestOrderQue('random');
    }
  };

  const handleVoteOrderQue = () => {
    if (voteOrderQue === 'random') {
      setAnsweredOrderQue('random');
      setLatestOrderQue('random');
      setVoteOrderQue('asc');
    } else if (voteOrderQue === 'asc') {
      setAnsweredOrderQue('random');
      setLatestOrderQue('random');
      setVoteOrderQue('desc');
    } else {
      setVoteOrderQue('random');
    }
  };

  const handleAnsweredOrderQue = () => {
    if (answeredOrderQue === 'random') {
      setLatestOrderQue('random');
      setVoteOrderQue('random');
      setAnsweredOrderQue('asc');
    } else if (answeredOrderQue === 'asc') {
      setLatestOrderQue('random');
      setVoteOrderQue('random');
      setAnsweredOrderQue('desc');
    } else {
      setAnsweredOrderQue('random');
    }
  };

  const filteredQuestions = [...questions].sort((a, b) => {
    if (voteOrderQue === 'asc') {
      return (a.upvote.length - a.downvote.length) - (b.upvote.length - b.downvote.length);
    } else if (voteOrderQue === 'desc') {
      return (b.upvote.length - b.downvote.length) - (a.upvote.length - a.downvote.length);
    } else if (latestOrderQue === 'asc') {
      return (new Date(a.created_at) - new Date(b.created_at));
    } else if (latestOrderQue === 'desc') {
      return (new Date(b.created_at) - new Date(a.created_at));
    } else if (answeredOrderQue === 'asc') {
      return (a.answer_length - b.answer_length);
    } else if (answeredOrderQue === 'desc') {
      return (b.answer_length - a.answer_length);
    }
    else {
      return 0; // No sorting
    }
  });

  // blogs filter
  const handleLatestOrderBlg = () => {
    if (latestOrderBlg === 'random') {
      setVoteOrderBlg('random');
      setViewOrderBlg('random');
      setLatestOrderBlg('asc');
    } else if (latestOrderBlg === 'asc') {
      setVoteOrderBlg('random');
      setViewOrderBlg('random');
      setLatestOrderBlg('desc');
    } else {
      setLatestOrderBlg('random');
    }
  };

  const handleVoteOrderBlg = () => {
    if (voteOrderBlg === 'random') {
      setLatestOrderBlg('random');
      setViewOrderBlg('random');
      setVoteOrderBlg('asc');
    } else if (voteOrderBlg === 'asc') {
      setLatestOrderBlg('random');
      setViewOrderBlg('random');
      setVoteOrderBlg('desc');
    } else {
      setVoteOrderBlg('random');
    }
  };

  const handleViewOrderBlg = () => {
    if (viewOrderBlg === 'random') {
      setVoteOrderBlg('random');
      setLatestOrderBlg('random');
      setViewOrderBlg('asc');
    } else if (viewOrderBlg === 'asc') {
      setVoteOrderBlg('random');
      setLatestOrderBlg('random');
      setViewOrderBlg('desc');
    } else {
      setViewOrderBlg('random');
    }
  };

  const filteredBlogs = [...blogs].sort((a, b) => {
    if (voteOrderBlg === 'asc') {
      return (a.upvote.length - a.downvote.length) - (b.upvote.length - b.downvote.length);
    } else if (voteOrderBlg === 'desc') {
      return (b.upvote.length - b.downvote.length) - (a.upvote.length - a.downvote.length);
    } else if (latestOrderBlg === 'asc') {
      return (new Date(a.created_at) - new Date(b.created_at));
    } else if (latestOrderBlg === 'desc') {
      return (new Date(b.created_at) - new Date(a.created_at));
    } else if (viewOrderBlg === 'asc') {
      return (a.view - b.view);
    } else if (viewOrderBlg === 'desc') {
      return (b.view - a.view);
    }
    else {
      return 0; // No sorting
    }
  });

  // main componenet
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
    <div className="main">
      <div className="main-container">


        <div className="main-top">
          {isBlogRoute ? <h2>All Blogs </h2> : <h2>All Questions</h2>}
          {
            isBlogRoute ?
              (user ? (<>

                <Link to="/add-blog">
                  <button>Add Blog</button>
                </Link>

              </>) : (<>

                <Link to="/auth">
                  <button>Add Blog</button>
                </Link>
              </>)) :

              ((user ? (<>

                <Link to="/add-question">
                  <button>Ask Question</button>
                </Link>

              </>) : (<>

                <Link to="/auth">
                  <button>Ask Question</button>
                </Link>
              </>)))
          }
        </div>


        <div className="main-desc">
          {isBlogRoute ? <p>Blogs</p> : <p> Questions</p>}
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                <Button onClick={isBlogRoute ? (handleLatestOrderBlg) : (handleLatestOrderQue)}>Latest</Button>
              </div>
              <div className="main-tab">
                <Button onClick={isBlogRoute ? (handleVoteOrderBlg) : (handleVoteOrderQue)}>Votes</Button>
              </div>
              {
                isBlogRoute ? (
                  <div className="main-tab">
                    <Button onClick={handleViewOrderBlg}>Views</Button>
                  </div>
                ) : (
                  <div className="main-tab">
                    <Button onClick={handleAnsweredOrderQue}>Answers</Button>
                  </div>
                )
              }
              
            </div>
          </div>
        </div>

        {isBlogRoute ? (

          blogs.length > 0 ? (
            <div className="questions">

              {filteredBlogs.map((blg) => (
                <div className='question' key={blg._id}>
                  <AllBlogs data={blg} />
                </div>
              ))}

            </div>
          ) : (
            <div className="questions">
              <h2>No Blogs found, write one now!</h2>
            </div>)

        )
          : (
            questions.length > 0 ? (
              <div className="questions">

                {filteredQuestions.map((ques) => (
                  <div className="question" key={ques._id}>
                    <AllQuestions data={ques}/>
                  </div>
                ))}
              </div>
            ) : (
              <div className="questions">
                <h2>No Questions found, ask one now!</h2>
              </div>
            )
          )
        }


      </div>
    </div>
  )
}

export default Main
