// User Actions
// Import Actions
import axios from 'axios';
import * as actionTypes from '../constants/userConstants';

export const LoginRequest = () => {
    return {
        type: actionTypes.USER_LOGIN_REQUEST,
    };
};

export const LoginSuccess = (user) => {
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: user,
    };
}

export const LoginFail = (error) => {
    return {
        type: actionTypes.USER_LOGIN_FAIL,
        payload: error,
    };
}

export const Logout = () => {
    return {
        type: actionTypes.USER_LOGOUT,
    };
}

export const LogoutUser = () => {
    return async (dispatch) => {
        try {
            dispatch(Logout());
        } catch (error) {
            console.log(error);
        }
    };
}

// Get All Players

export function fetchData() {
    return async(dispatch) => {
      dispatch({ type: 'FETCH_DATA_START' });
      return await axios.get('https://football-backend-updated.herokuapp.com/users/GetAllPlayers')
        .then((response) => {
          dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data.data });
        })
        .catch((error) => {
          dispatch({ type: 'FETCH_DATA_ERROR', payload: error });
        });
    };
  }

  // Get All Coaches

    export function fetchCoachData() {
        return async(dispatch) => {
          dispatch({ type: 'FETCH_COACH_DATA_START' });
          return await axios.get('https://football-backend-updated.herokuapp.com/users/GetAllCoaches')
            .then((response) => {
              dispatch({ type: 'FETCH_COACH_DATA_SUCCESS', payload: response.data.data });
            })
            .catch((error) => {
              dispatch({ type: 'FETCH_COACH_DATA_ERROR', payload: error });
            });
        };
      }
  
// Get All Post

export function fetchPostData() {
    return async(dispatch) => {
      dispatch({ type: 'FETCH_POST_DATA_START' });
      return await axios.get('https://football-backend-updated.herokuapp.com/newsfeed/GetAllNewsFeed')
        .then((response) => {
          dispatch({ type: 'FETCH_POST_DATA_SUCCESS', payload: response.data.data });
        })
        .catch((error) => {
          dispatch({ type: 'FETCH_POST_DATA_ERROR', payload: error });
        });
    };
  }