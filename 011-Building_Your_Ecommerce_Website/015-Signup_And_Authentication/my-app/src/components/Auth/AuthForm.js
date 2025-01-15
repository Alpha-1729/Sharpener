import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef('');
  const passwordInputRef = useRef('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {

    } else {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSdsdyDw_dsdsZ4NUqrIU9qsdsdX8uY7h-E41ETrni_9sY`, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.ok) {
          emptyFields();
        } else {
          return res.json().then(data => {
            alert('EMAIL Exists');
            emptyFields();
          })
        }
      });
    }
  }

  function emptyFields() {
    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            required
          />
        </div>
        {!isLogin && (
          <button
            type="button"
            onClick={submitHandler}
            className={classes['button-signup']}
          >
            Create Account
          </button>
        )}

        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
