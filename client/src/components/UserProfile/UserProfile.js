import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getUser, getUserAnswers, getUserBlogs, getUserQuestions, deleteUser } from '../../utils/UserHelper';
import './UserProfile.css';
import ReactHtmlParser from "react-html-parser";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import Sidebar from '../Cpform/Sidebar';
import { Avatar } from '@mui/material';


const UserProfile = () => {
  const authUser = useSelector(selectUser);
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);
  const navigate = useNavigate();

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUser(id);
        setUserProfile(userData);
        const answerData = await getUserAnswers(id);
        setUserAnswers(answerData);
        const blogData = await getUserBlogs(id);
        setUserBlogs(blogData);
        const questionData = await getUserQuestions(id);
        setUserQuestions(questionData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleUserDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this account?');
    if (confirmDelete) {
      await deleteUser(id);
      navigate('/');
    }
  };

  const EditProfile = () =>{
    navigate(`/edit-user/${id}`);
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}


  return (
    <>
      <div className='cp-index'>
        <div className='cp-index-content'>
          <Sidebar />
          <div className="user-profile-container">
            <div className="user-detail">
              {/* <Avatar className='css-2s90m6-MuiAvatar-root userimg' >{userProfile.username ? userProfile.username.charAt(0) : null}</Avatar> */}
              <div className='userimg'>
              <p>{userProfile.username ? userProfile.username.charAt(0) : null}</p>
              </div>
              <div className='user-info'>
                <h2>{userProfile.username}</h2>
                <p>{userProfile.bio}</p>
                <p>{userProfile.email}</p>
              </div>
            </div>

            <div className="user-actions">
              {authUser && (authUser.email !== 'moderator.hotfix@gmail.com' && authUser.email === userProfile.email) && (
                <button className='button' onClick={EditProfile}>Edit Profile</button>
               
              )}
              {authUser && (userProfile.email !== 'moderator.hotfix@gmail.com' && (authUser.email === 'moderator.hotfix@gmail.com' || authUser.email === userProfile.email)) && (
                <button onClick={() => handleUserDelete(userProfile._id)} className="button">Delete Account</button>
              )}
            </div>

            <div className="user-questions">
              <h3>Questions</h3>
              {userQuestions.length > 0 ? (
                <div className="question-list">
                  {userQuestions.map((question) => (
                    <div key={question._id} className='question-item'>
                      <Link to={`/question/${question._id}`} className="question-link">{truncate(question.title,100)}</Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No questions</p>
              )}
            </div>

            <div className="user-answers">
              <h3>Answers</h3>
              {userAnswers.length > 0 ? (
                <div className="answer-list">
                  {userAnswers.map((answer) => (
                    <div key={answer._id} className="answer-item">
                      <Link to={`/question/${answer.question}`} className="answer-link">{ReactHtmlParser(truncate(answer.body, 100))}</Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No answers</p>
              )}
            </div>

            <div className="user-blogs">
              <h3>Blogs</h3>
              {userBlogs.length > 0 ? (
                <div className='blog-list'>
                  {userBlogs.map((blog) => (
                    <div key={blog._id} className='blog-item'>
                      <Link to={`/blog/${blog._id}`} className="blog-link">{truncate(blog.title,100)}</Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No blogs</p>
              )}
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default UserProfile;