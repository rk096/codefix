import './index.css';
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getUser } from '../../utils/UserHelper';
import React, { useState, useEffect } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

function EditDetails({ id }) {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(id);
            setUsername(user.username);
            setBio(user.bio);
        }
        fetchUser();
    }, [id]);

    const handleUpdateUser = async () => {
        if (username && username.trim() !== '') {
            const usr = { username, bio };
            await updateUser(id, usr);
            alert('Details updated successfully!');
            navigate(`/user/${id}`);
        }
        else {
            console.error('Insufficient details to update user.');
            alert("Please fill provide a username to update!");
        }
    }

    return (
        <>
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
                        <div className='title'>
                            <h3>About</h3>
                            <small>tell us about yourself</small>
                            <input type='text' placeholder='bio' value={bio} onChange={(e) => setBio(e.target.value)} />
                        </div>
                    </div>

                </div>

            </div>
            <div className='btn-container'>
                <button className='btn' onClick={handleUpdateUser}>Save</button>
            </div>
        </>
    );
}

function EditPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleUpdatePassword = async () => {
        if (confirmPassword && password && confirmPassword.trim() !== '' && password.trim() !== '') {
            if (passwordIsValid(password)) {
                if (password !== confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }
                const fireUser = getAuth().currentUser; // Get the current user
                if (fireUser) {
                    try {
                        await updatePassword(fireUser, confirmPassword); // Update the password
                        console.log('Password updated successfully!');
                        alert('Password updated successfully!');
                        // navigate(`/user/${id}`);
                    } catch (error) {
                        console.error('Error updating password:', error);
                        alert("Requires recent login to update profile! Please login again.");
                    }
                }
            }
            else {
                alert('Password must contain at least 1 letter, 1 number and be at least 8 characters long.');
                return;
            }
        } else {
            console.error('Insufficient details to update password.');
            alert("Please provide password to update!");
        }
    }

    const passwordIsValid = (password) => {
        var regex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    };

    

    return (
        <>
            <div className='user-container'>
                <div className='user-options'>

                    <div className='user-option'>
                        <div className='title' style={{ position: 'relative' }}>
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
                        <div className='title' style={{ position: 'relative' }}>
                            <h3>Confirm Password</h3>
                            <small>confirm password must be same as password !</small>
                            <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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
                            </IconButton>
                        </div>
                    </div>

                </div>

            </div>
            <div className='btn-container'>
                <button className='btn' onClick={handleUpdatePassword}>Save</button>
            </div>
            
        </>
    );
}

function Index() {
    const { id } = useParams();
    const [menuOptions, setMenuOptions] = useState(true);
    const navigate = useNavigate();

    const handleCancle = () => {
        navigate(`/user/${id}`);
    }

    return (
        <div className='add-user'>
            <div className='add-user-container'>

                <div className='head-title'>
                    <h1 className='menu'>
                        <button className={menuOptions ? 'active' : 'inactive'} onClick={() => setMenuOptions(true)}>
                            Edit Profile
                        </button>
                    </h1>
                    <h1 className='menu'>
                        <button className={!menuOptions ? 'active' : 'inactive'} onClick={() => setMenuOptions(false)}>
                            Update Password
                        </button>
                    </h1>
                    <h1 className='goback'>
                        <button onClick={handleCancle}>Cancel</button>
                    </h1>
                    
                </div>
                {menuOptions ? <EditDetails id={id} /> : <EditPassword />}

            </div>
        </div>
    )

};
export default Index