import axios from "axios";
import * as c from "../../constants/constants";

const BASE_URL = "http://127.0.0.1:8000";

// * USER ACTIONS

export const register = (email, password, repeated_password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_REGISTER_REQUEST });

      const config = {
        "Content-Type": "application/json",
      };

      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/api/users/register/`,
        headers: config,
        data: {
          email,
          password,
          repeated_password,
        },
      });

      await localStorage.setItem(
        "@userData",
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

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LOGIN_REQUEST });

      const config = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/api/users/login/`,
        headers: config,
        data: {
          email,
          password,
        },
      });

      await localStorage.setItem(
        "@userData",
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

export const followUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.FOLLOW_USER_REQUEST });

      const userData = JSON.parse(await localStorage.getItem("@userData"));

      const config = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/api/users/${id}/actions/follow`,
        headers: config,
      });

      dispatch({
        type: c.FOLLOW_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.FOLLOW_USER_FAIL,
        payload: error,
      });
    }
  };
};

// * MEMBERS ACTIONS

export const listMembers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LIST_MEMBERS_REQUEST });

      const userData = JSON.parse(await localStorage.getItem("@userData"));

      const config = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/api/members/`,
        headers: config,
      });

      dispatch({
        type: c.LIST_MEMBERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LIST_MEMBERS_FAIL,
        payload: error,
      });
    }
  };
};

export const getMember = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.GET_MEMBER_REQUEST });

      const userData = JSON.parse(await localStorage.getItem("@userData"));

      const config = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/api/members/${id}/`,
        headers: config,
      });

      dispatch({
        type: c.GET_MEMBER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.GET_MEMBER_FAIL,
        payload: error,
      });
    }
  };
};

export const approveMember = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.APPROVE_MEMBER_REQUEST });

      const userData = JSON.parse(await localStorage.getItem("@userData"));

      const config = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/api/members/${id}/actions/approve/`,
        headers: config,
      });

      dispatch({
        type: c.APPROVE_MEMBER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.APPROVE_MEMBER_FAIL,
        payload: error,
      });
    }
  };
};

export const disapproveMember = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.DISAPPROVE_MEMBER_REQUEST });

      const userData = JSON.parse(await localStorage.getItem("@userData"));

      const config = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/api/members/${id}/actions/disapprove/`,
        headers: config,
      });

      dispatch({
        type: c.DISAPPROVE_MEMBER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.DISAPPROVE_MEMBER_FAIL,
        payload: error,
      });
    }
  };
};

// * PROPOSAL ACTIONS

export const listProposals = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LIST_PROP_REQUEST });

      const userData = JSON.parse(localStorage.getItem("@userData"));
      console.log("user data -> ", userData);

      const config = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/api/proposals/`,
        headers: config,
      });

      dispatch({
        type: c.LIST_PROP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LIST_PROP_FAIL,
        payload: error,
      });
    }
  };
};

export const getProposal = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.GET_PROP_REQUEST });

      const userData = JSON.parse(await localStorage.getItem("@userData"));

      const config = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/api/proposals/${id}/`,
        headers: config,
      });

      dispatch({
        type: c.GET_PROP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.GET_PROP_FAIL,
        payload: error,
      });
    }
  };
};

export const createProposal = (title, summary, content) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.CREATE_PROP_REQUEST });

      const userData = JSON.parse(await localStorage.getItem("@userData"));

      const config = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/api/proposals/`,
        headers: config,
        data: {
          title,
          summary,
          content,
        },
      });

      dispatch({
        type: c.CREATE_PROP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.CREATE_PROP_FAIL,
        payload: error,
      });
    }
  };
};

export const positiveVote = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.POSITIVE_PROP_REQUEST });

      const userData = JSON.parse(await localStorage.getItem("@userData"));

      const config = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/api/proposals/${id}/actions/upvote/`,
        headers: config,
      });

      dispatch({
        type: c.POSITIVE_PROP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.POSITIVE_PROP_FAIL,
        payload: error,
      });
    }
  };
};

export const negativeVote = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.NEGATIVE_PROP_REQUEST });

      const userData = JSON.parse(await localStorage.getItem("@userData"));

      const config = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/api/proposals/${id}/actions/downvote/`,
        headers: config,
      });

      dispatch({
        type: c.NEGATIVE_PROP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.NEGATIVE_PROP_FAIL,
        payload: error,
      });
    }
  };
};
