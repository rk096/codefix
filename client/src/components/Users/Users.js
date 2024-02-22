import React, { useState, useEffect } from 'react';
import './Users.css';
import { getAllUsers } from '../../utils/UsersHelper';
import { Link } from 'react-router-dom';

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
    <div className="users-container">
      {/* {users.map((user) => (
        <div className="user-card" key={user._id}>
          <Link to={`/user/${user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={user.profilepic} alt="Profile" className="profile-pic" />
            <div className="user-details">
              <h2>{user.username}</h2>
              <p>{user.bio}</p>
            </div>
          </Link>
        </div>
      ))} */}
      <div className="user-card">
        <img  alt="Profile" className="profile-pic"/>
          <div className="user-details">
            <h2>
            asdfkkkgk
            </h2>
            <p>
            dfsfajslfjlasjfjsalfjljjlfjaljldfjlkajkfjljf
            </p>
          </div>
      </div>

      <div className="user-card">
        <img  alt="Profile" className="profile-pic"/>
          <div className="user-details">
            <h2>
            asdfkkkgk
            </h2>
            <p>
            dfsfajslfjlasjfjsalfjljjlfjaljldfjlkajkfjljf
            </p>
          </div>
      </div>

      <div className="user-card">
        <img  alt="Profile" className="profile-pic"/>
          <div className="user-details">
            <h2>
            asdfkkkgk
            </h2>
            <p>
            dfsfajslfjlasjfjsalfjljjlfjaljldfjlkajkfjljf
            </p>
          </div>
      </div>

      <div className="user-card">
        <img  alt="Profile" className="profile-pic"/>
          <div className="user-details">
            <h2>
            asdfkkkgk
            </h2>
            <p>
            dfsfajslfjlasjfjsalfjljjlfjaljldfjlkajkfjljf
            </p>
          </div>
      </div>

      <div className="user-card">
        <img  alt="Profile" className="profile-pic"/>
          <div className="user-details">
            <h2>
            asdfkkkgk
            </h2>
            <p>
            dfsfajslfjlasjfjsalfjljjlfjaljldfjlkajkfjljf
            </p>
          </div>
      </div>

      <div className="user-card">
        <img  alt="Profile" className="profile-pic"/>
          <div className="user-details">
            <h2>
            asdfkkkgk
            </h2>
            <p>
            dfsfajslfjlasjfjsalfjljjlfjaljldfjlkajkfjljf
            </p>
          </div>
      </div>
    </div>
  );
}

export default Users;
