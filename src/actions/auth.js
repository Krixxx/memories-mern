import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

//sign in function. Send data from login form to server and on success redirect user to main page. formData is following:{firstName, lastName, email, password, confirmPassword}.
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //we get back data, which is following: {user info, token}
    const { data } = await api.signIn(formData);

    //we dispatch result to reducer and add it to authData state
    dispatch({ type: AUTH, data });

    //now we navigate to home page
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

//sign up function. Send data from sign up form to server and on success redirect user to main page
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
