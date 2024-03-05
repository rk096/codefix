import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AllQuestions from './AllQuestions';
import './css/main.css';
import { AuthContext } from '../../App';
import AllBlogs from './AllBlog';

function Main({ question, blog }) {

  // console.log("main",blog);
  const user = useContext(AuthContext);
  const location = useLocation();
  const isBlogRoute = location.pathname === "/blogs";


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
                {/* <a href="/">Newest</a> */}
                <Link to="/">Most voted</Link>
              </div>
              <div className="main-tab">
                <Link to="/">Answered</Link>
              </div>
              <div className="main-tab">
                <Link to="/">Unaswered</Link>
              </div>
            </div>
          </div>
        </div>

        {isBlogRoute ? (

          blog.length > 0 ? (
            <div className="questions">

              {blog.map((blg) => (
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
            question.length > 0 ? (
              <div className="questions">

                {question.map((ques) => (
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
