import * as c from '../../constants';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case c.USER_REGISTER_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case c.LOGIN_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.LOGIN_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.LOGIN_RESET:
      return {};
    default:
      return state;
  }
};
