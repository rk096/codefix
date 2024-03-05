import './index.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateUser, getUser } from '../../utils/UserHelper';
import React, { useState, useEffect } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

function Index() {
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(id);
            setUsername(user.username);
            setPassword(user.password);
            setBio(user.bio);
        }
        fetchUser();
    }, [id]);

    const passwordIsValid = (password) => {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    };

    const handleUpdateUser = async () => {
        if (username && password && username.trim() !== '' && password.trim() !== '') {
            if (!passwordIsValid(password)) {
                alert('Password must contain at least 1 letter, 1 number and be at least 8 characters long.');
                return;
            }
            else {
                const fireUser = getAuth().currentUser; // Get the current user
                if (fireUser) {
                    try {
                        await updatePassword(fireUser, password); // Update the password
                        console.log('Password updated successfully!');
                        const usr = { username, password, bio };
                        await updateUser(id, usr);
                        navigate(`/user/${id}`);
                    } catch (error) {
                        console.error('Error updating password:', error);
                        alert("Requires recent login to update profile! Please login again.");
                    }
                }
            }
        } else {
            console.error('Insufficient details to update user.');
            alert("Please fill appropriate data in the fields!");
        }
    }

    return (
        <div className='add-user'>
            <div className='add-user-container'>
                <div className='head-title'>
                    <h1>Edit Profile</h1>
                </div>

                <div className='user-container'>
                    <div className='user-options'>

                        <div className='user-option'>
                            <div className='title'>
                                <h3>Username</h3>
                                <small>your display name</small>
                                <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                        </div>
                        <div className='user-option'>
                            <div className='title' style={{ position: 'relative'}}>
                                <h3>Password</h3>
                                <small>password must be 8 characters, must have atleast 1 number and 1 letter</small>
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            top: '80%',
                                            right: '2px',
                                            transform: 'translateY(-50%)', // center vertically
                                        }}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                            </div>
                        </div>
                        <div className='user-option'>
                            <div className='title'>
                                <h3>About</h3>
                                <small>tell us about yourself</small>
                                <input type='text' placeholder='bio' value={bio} onChange={(e) => setBio(e.target.value)} />
                            </div>
                        </div>

                    </div>
                </div>
                <button className='button' onClick={handleUpdateUser}>Edit user</button>
                <Link to={`/user/${id}`}>Cancel</Link>
            </div>
        </div>
    )

};
export default Index