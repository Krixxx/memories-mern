import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import decode from 'jwt-decode';

import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

import useStyles from './styles';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); //we need location so we can trigger useEffect, when location changes from '/auth' to '/'.

  //log user out
  const logout = () => {
    //dispatch LOGOUT action directly to reducer. This clears all user data from state
    dispatch({ type: LOGOUT });

    //Go to auth page
    navigate('/auth');

    //set user to null
    setUser(null);
  };

  //check for user token when location changes. If there is token and token is valid, we set user state form localStorage. If token is not valid or has expired, we use logout() function.
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={classes.brandContainer}>
        <img src={memoriesText} alt='icon' height='45px' />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt='memories'
          height='40px'
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
