import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './AuthForm.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const API_KEY = 'AIzaSyDw_Z4NUqrIU9qjX8uY7h-E41ETrni_9sY';

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef('');
  const passwordInputRef = useRef('');
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    if (isLogin) {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(res => {
        setIsLoading(false);
        if (res.ok) {
          emptyFields();
          return res.json().then(async data => {
            authCtx.login(data.idToken);
            navigate('/profile');
          })
        } else {
          return res.json().then(data => {
            let errorMessage = 'Authentication Failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          })
        }
      })
    } else {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
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
        setIsLoading(false);
        if (res.ok) {
          emptyFields();
          navigate("/");
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
        {!isLoading && (
          <button
            type="button"
            onClick={submitHandler}
            className={classes['button-signup']}
          >
            {!isLogin ? 'Create Account' : 'Login'}
          </button>
        )}

        {isLoading && <p>Loading</p>}

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
