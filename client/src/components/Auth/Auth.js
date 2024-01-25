import './Auth.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createUser, loginUser } from '../../utils/ServerHelpers';
import { useCookies } from 'react-cookie';


const Auth = () => {

  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //const [cookies, setCookie = useCookies(["token"])];
  const [cookies, setCookie, /* removeCookie */] = useCookies(["token"]);


  const handleSwitch = () => {
    setIsSignup(!isSignup)
  }


  const handleSignInGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      //console.log(res);
      const user = res.user;
      console.log("token", user);
          const additionalInfo = {
            email: user.email,
            password: password,
          };

          // loginUser(additionalInfo)
          // .then((data) => {
          //   console.log('User loggedin successfully:', data.message);
          //   setCookie("token", data.token, {path:"/", maxAge:60});
          // })
    })
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email === "" || password === "" || username === "") {
      setError("Required field is missing");
      setLoading(false);
    }
    else {

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          const additionalInfo = {
            email: user.email,
            password: password,
            username: username,
          };

          // Create user in backend
          createUser(additionalInfo)
            .then((data) => {
              console.log('User created successfully:', data.message);
              
              setLoading(false);
            })
            .catch((error) => {
              console.error('Error creating user in backend:', error.message);
              setError(error.message);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error('Error creating user:', error.code, error.message);
          setError(error.message);
          setLoading(false);
        });
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email === "" || password === "") {
      setError("Required field is missing.");
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
       
        const user = userCredential.user;

        const additionalInfo = {
          email: user.email,
          password: password,
        };

        // log user in backend
        loginUser(additionalInfo)
          .then((data) => {
            console.log('User loggedin successfully:', data.message);
            setLoading(false);
            setCookie("token", data.token, {path:"/", maxAge:60});
            navigate('/');

          })
          .catch((error) => {
            console.error('Error login user in backend:', error.message);
            setError(error.message);
            setLoading(false);
          });
        
      }).catch((error) => {
        console.log(error.code);
        setError(error.message);
        setLoading(false);
      })
    }
  }


  return (
    <section className='auth-section'>


      <div className='auth-options'>

        <div className="sign-options">
          <div onClick={handleSignInGoogle} className="single-option">
            <img
              alt="google"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7TjCijCsE8Ix1uSi3q8Kk4T_x1tYvALEqlA&usqp=CAU"
            />
            <p>Login with Google</p>
          </div>
          <div className="single-option">
            <img
              alt="github"
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            />
            <p>Login with Github</p>
          </div>
        </div>

      </div>



      <div className='auth-container'>
        {!isSignup && <img src="" alt='logo' className='login-logo' />}
        <form>
          {
            isSignup && (
              <label htmlFor='name'>
                <h4>Username</h4>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="name" id="name" />
              </label>
            )
          }
          <label htmlFor='email'>
            <h4>Email</h4>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name='email' id='email' />
          </label>
          <label htmlFor='password'>
            <div style={{ display: "flex" }}>
              <h4>Password</h4>
              {!isSignup && <p className='forgot-password'>forgot pssword?</p>}
            </div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name='password' id='password' />
            {isSignup && <p>Password must contain at least eight <br />characters, including at least 1 leter and 1 <br />number</p>}
          </label>


          <button onClick={isSignup ? handleRegister : handleSignIn} type='submit' className='auth-btn' disabled={loading}>
            {loading ? (isSignup ? 'Signing....' : 'Loging...') : (isSignup ? 'Sign up' : 'Log in')}
          </button>
        </form>
        <p>
          {isSignup ? 'already have an account?' : "Don't have an account?"}
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? 'Log in' : 'Sign up'}</button>
        </p>

      </div>
      {
        error !== "" && (<p style={{
          color: "red",
          fontSize: "14px"
        }}>
          {error}
        </p>)
      }

    </section>
  )
}

export default Auth






