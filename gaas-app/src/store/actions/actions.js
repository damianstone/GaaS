import axios from 'axios';
import * as c from '../../constants';

const BASE_URL = 'http://127.0.0.1:8000';

export const userRegister = (email, password, repeated_password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_REGISTER_REQUEST });

      const config = {
        'Content-Type': 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/users/register/`,
        headers: config,
        data: {
          email,
          password,
          repeated_password,
        },
      });

      await localStorage.setItem(
        '@userData',
        JSON.stringify({
          token: data.token,
        })
      );

      dispatch({
        type: c.USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.USER_REGISTER_FAIL,
        payload: error,
      });
    }
  };
};

export const userLogin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LOGIN_REQUEST });

      const userData = JSON.parse(await localStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/users/login/`,
        headers: config,
        data: {
          email,
          password,
        },
      });

      await localStorage.setItem(
        '@userData',
        JSON.stringify({
          token: data.token,
        })
      );

      dispatch({
        type: c.LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LOGIN_FAIL,
        payload: error,
      });
    }
  };
};
