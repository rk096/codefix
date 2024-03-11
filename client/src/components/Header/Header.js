import React, { useEffect, useState } from 'react'
import './css/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../App';
import { getUserByEmail } from '../../utils/UserHelper.js';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase.js';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice.js';
import { useCookies } from 'react-cookie';

function Header() {

  const user = useSelector(selectUser);
  //console.log("auth user :",user);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  // const user = useContext(AuthContext);
  const [mongoUser, setMongoUser] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        if (user) {
          try {
            const userM = await getUserByEmail(user.email);
            setMongoUser(userM);
            console.log("mongo user", userM);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      };

      fetchData();
    }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      removeCookie('token');
     // setMongoUser('');
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
            <img src="\hotfixlogo.jpg" alt='logo' style={{ borderRadius: '50%', width: '50px', height: '50px' }}/>
            <span>HotFix</span>
          </Link>
          
        </div>
        <div className='header-middle'>
          <div className='header-search-container'>
            <SearchIcon />
            <input type='text' placeholder='Search...' />

          </div>
        </div>
        <div className='header-right'>
          <div className='header-right-container'>
            {user ? 
            (
              <>
                <Link to={`/user/${mongoUser?._id}`} className='avtlink'>
                <Avatar style={{ marginRight: "10px"}}>{mongoUser?.username?.charAt(0)}</Avatar>
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
