import React, { useState } from 'react'
import './Auth.css';

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false);

  const handleSwitch = () => {
    setIsSignup(!isSignup)
  }

  return (
    <section className='auth-section'>
      <div className='auth-container'>
        {!isSignup && <img src="" alt='logo' className='login-logo' />}
        <form>
          {
            isSignup && (
              <label htmlFor='name'>
                <h4>Display Name</h4>
                <input type="text" name="name" id="name" />
              </label>
            )
          }
          <label htmlFor='email'>
            <h4>Email</h4>
            <input type="email" name='email' id='email' />
          </label>
          <label htmlFor='password'>
            <div style={{ display: "flex" }}>
              <h4>Password</h4>
              {!isSignup && <p className='forgot-password'>forgot pssword?</p>}
            </div>
            <input type="password" name='password' id='password' />
            {isSignup && <p>Password must contain at least eight <br />characters, including at least 1 leter and 1 <br />number</p>}
          </label>
          

          <button type='submit' className='auth-btn'>
            {isSignup ? 'Sign up' : 'Log in'}
          </button>
        </form>
        <p>
          {isSignup ? 'already have an account?' : "Don't have an account?"}
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? 'Log in' : 'Sign up'}</button>
        </p>

      </div>

    </section>
  )
}

export default Auth






