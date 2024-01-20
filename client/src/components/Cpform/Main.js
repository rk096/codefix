import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AllQuestions from './AllQuestions';
import FilterListIcon from "@material-ui/icons/FilterList";
import './css/main.css';
import { AuthContext } from '../../App';

function Main() {

  const user = useContext(AuthContext);

    return (
        <div className="main">
        <div className="main-container">
          <div className="main-top">
            <h2>All Questions</h2>
            {
              user ? (<>

                <Link to="/add-question">
              <button>Ask Question</button>
            </Link>

              </>) : (<>

                <Link to="/auth">
              <button>Ask Question</button>
            </Link>
              </>)
            }
           
  
          </div>
          <div className="main-desc">
            <p> questions</p>
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
                <AllQuestions />
              </div>
        
          </div>
        </div>
      </div>
  
           )
}

export default Main
