import React, { useEffect, useState, useRef } from 'react'
import './css/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAllUsers } from '../../utils/UserHelper.js';
import { getAllQuestions } from '../../utils/QuestionHelper.js';
import { getAllBlogs } from '../../utils/BlogHelper.js';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase.js';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice.js';
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';
// Modal.setAppElement('#root');

function SearchComponent() {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/auth";
  const [search, setSearch] = useState('');
  const [queResults, setQueResults] = useState([]);
  const [blgResults, setBlgResults] = useState([]);
  const [usrResults, setUsrResults] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const inputRef = useRef();

  function openModal() {
    inputRef.current.focus();
    setIsOpen(true);
  }

  function closeModal() {
    setSearch('');
    setIsOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (search !== '') {
        // Fetch the data from your database
        const questions = await getAllQuestions();
        const blogs = await getAllBlogs();
        const users = await getAllUsers();

        // Filter the data based on the search state
        const filteredQuestions = questions.filter(question =>
          question.title.includes(search)
        );
        const filteredBlogs = blogs.filter(blog =>
          blog.title.includes(search)
        );
        const filteredUsers = users.filter(user =>
          user.email.includes(search) || user.username.includes(search)
        );

        // Update the results state with the filtered data
        setQueResults(filteredQuestions);
        setBlgResults(filteredBlogs);
        setUsrResults(filteredUsers);
      }
      else {
        setBlgResults([]);
        setQueResults([]);
        setUsrResults([]);
      }
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    if (modalIsOpen) {
      inputRef.current.focus();
    }
  }, [modalIsOpen]);

  return (
    <>
      <div className='header-middle'>
        <div className='header-search-container' onClick={openModal}>
          <SearchIcon />
          <input ref={inputRef} type='text' placeholder='Search...' disabled={isAuthRoute ? true : false}
            value={search} onChange={e => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <Modal ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Search Results"
        style={{
          content: {
            position: 'absolute',
            top: '15%',
            left: '20%',
            height: '50%',
            width: '60%',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
      >
        <div className='search-content'>
          <h2>Search Results</h2>
          <div className='search-items'>
            <h3>Questions</h3>
            {queResults.length === 0 ? 
                  <p>No results found</p> 
                  : 
                  (queResults.map(result => (<Link className='data-item' to={`/question/${result._id}`} onClick={closeModal} key={result._id}>{result.title}</Link>)))
            }
            
            <h3>Blogs</h3>
            {blgResults.length === 0 ? 
                  <p>No results found</p> 
                  : 
                  (blgResults.map(result => (<Link className='data-item' to={`/blog/${result._id}`} onClick={closeModal} key={result._id}>{result.title}</Link>)))
            }

            <h3>Users</h3>
            {usrResults.length === 0 ? 
                  <p>No results found</p> 
                  : 
                  (usrResults.map(result => (<Link className='data-item' to={`/user/${result._id}`} onClick={closeModal} key={result._id}>{result.username}</Link>)))
            }
          </div>
        </div>

      </Modal>
    </>
  );
}

function Header() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["token"]);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleLogout = async () => {
    try {
      await signOut(auth);
      removeCookie("token");
      localStorage.removeItem('userData');
      navigate('/auth');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <header>
      <div className='header-container'>

        <div className='header-left'>
          <Link to='/' className='headerlink'>
            <img src="\hotfixlogo.jpg" alt='logo' style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
          </Link>
          <span>CodeFix</span>
        </div>

        <SearchComponent />

        <div className='header-right'>
          <div className='header-right-container'>
            {user ?
              (
                <>
                  <Link to={`/user/${userData?._id}`} className='avtlink'>
                    <Avatar style={{ marginRight: "10px" }}>{userData?.username?.charAt(0)}</Avatar>
                  </Link>
                  <Link onClick={handleLogout} className='nav-item nav-links'>Log out</Link>
                </>
              ) : (
                <Link to='/auth' className='nav-item nav-links'>Log In</Link>
              )
            }
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header
