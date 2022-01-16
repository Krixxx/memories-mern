import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';

import { GoogleLogin } from 'react-google-login';

import { useDispatch } from 'react-redux';

import { AUTH } from '../../constants/actionTypes';

import { useNavigate, Navigate } from 'react-router-dom';

import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';

import Input from './Input';

import { signin, signup } from '../../actions/auth';

//set up our initial, empty state
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  //get user from localStorage
  const user = JSON.parse(localStorage.getItem('profile'));

  //toggle showPassword state
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //handle our submit. In case of sign in or sign up.
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      //dispatch sign up data to auth actions
      dispatch(signup(formData, navigate));
    } else {
      //dispatch sign in data to auth actions
      dispatch(signin(formData, navigate));
    }
  };

  //controlled state handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //toggle between sign up and sign in
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  //in case of successful google login. We get response from react-google-login library and pass it in as response. profileObj is our user profile and token is user token. We then access auth reducer directly, without auth action and dispatch user data to state.
  const googleSuccess = async (response) => {
    const result = response?.profileObj; //question mark prevents throwing an error. It just gives undefined, if object does not exist.

    const token = response?.tokenId;

    try {
      //dispatch user data directly to state
      dispatch({ type: AUTH, data: { result, token } });

      //navigate to home page after successful login
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  //if google auth failes, show error in log.
  const googleFailure = (error) => {
    console.log('Google Sign In was unsuccessful. Try again later.');
  };

  return (
    <>
      {user && <Navigate to='/posts' />}
      <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name='firstName'
                    label='First Name'
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name='lastName'
                    label='Last Name'
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name='email'
                label='Email Address'
                handleChange={handleChange}
                type='email'
              />
              <Input
                name='password'
                id='Password'
                label='Password'
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name='confirmPassword'
                  label='Repeat Password'
                  handleChange={handleChange}
                  type='password'
                />
              )}
            </Grid>
            <Button
              type='submit'
              fullWidth
              data-test-id='login-button'
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color='primary'
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant='contained'
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
            />
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? 'Already have an account? Sign In'
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <div>
          <p>Demo email: demo@demo.demo</p>
          <p>Demo password: 123456</p>
        </div>
      </Container>
    </>
  );
};

export default Auth;
