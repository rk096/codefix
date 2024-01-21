import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import AllQuestions from './AllQuestions';
import FilterListIcon from "@material-ui/icons/FilterList";
import './css/main.css';
import { AuthContext } from '../../App';
import AllBlogs from './AllBlog';

function Main() {

  const user = useContext(AuthContext);
  const location = useLocation();
  const isBlogRoute = location.pathname === "/blogs";

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          {isBlogRoute ? <h2>All Blogs </h2> : <h2>All Questions</h2> }
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
         {isBlogRoute ? <p>Blogs</p> : <p> questions</p>}
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                {/* <a href="/">Newest</a> */}
                <Link to="/">Newest</Link>
              </div>
              <div className="main-tab">
                <Link to="/">Active</Link>


              </div>
              <div className="main-tab">

                <Link to="/">More</Link>
              </div>
            </div>
            <div className="main-filter-item">
              <FilterListIcon />
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="questions">
          <div className="question">
            {isBlogRoute ? <AllBlogs /> : <AllQuestions />}
          </div>

        </div>
      </div>
    </div>

  )
}

export default Main
