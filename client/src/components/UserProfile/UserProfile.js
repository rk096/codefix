import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getuname } from '../../utils/UserHelper';
import { Link } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getuname(userId);
        setUserProfile(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <h2>{userProfile.username}</h2>

      <h3>Questions</h3>
      <div>
        {userProfile.questions.map((question) => (
          <div key={question._id}>
            <Link to={`/question/${question._id}`}>{question.title}</Link>
          </div>
        ))}
      </div>

      <h3>Answers</h3>
      <div>
        {userProfile.answers.map((answer) => (
          <div key={answer._id}>
            <Link to={`/answer/${answer._id}`}>Answer for question: {answer.question.title}</Link>
          </div>
        ))}
      </div>

      <h3>Blogs</h3>
      <div>
        {userProfile.blogs.map((blog) => (
          <div key={blog._id}>
            <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
