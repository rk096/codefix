import React, { useState, useEffect } from 'react';
import './Users.css';
import { getAllUsers } from '../../utils/UsersHelper';
import { Link } from 'react-router-dom';
import Sidebar from '../Cpform/Sidebar';
import { Avatar } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='cp-index'>
        <div className='cp-index-content'>
          <Sidebar />
          <div className="users-container">
            {users.map((user) => (
              <div className="user-card" key={user._id}>
                <Link to={`/user/${user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Avatar >{user?.username.charAt(0)}</Avatar>
                  <div className="user-details">
                    <h2>{user.username}</h2>
                    {
                      user.bio ?
                        <p>{user.bio}</p> :
                        <p><i>no bio available</i></p>
                    }
                  </div>
                </Link>
              </div>

            ))}

          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
