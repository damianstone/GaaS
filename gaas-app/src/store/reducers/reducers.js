import * as c from '../../constants/constants';

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
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

export const followUserReducer = (state = {}, action) => {
  switch (action.type) {
    case c.FOLLOW_USER_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.FOLLOW_USER_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.FOLLOW_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case c.LIST_MEMBERS_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.LIST_MEMBERS_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.LIST_MEMBERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case c.GET_MEMBER_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.GET_MEMBER_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.GET_MEMBER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const approveMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case c.APPROVE_MEMBER_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.APPROVE_MEMBER_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.APPROVE_MEMBER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const disapproveMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case c.DISAPPROVE_MEMBER_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.DISAPPROVE_MEMBER_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.DISAPPROVE_MEMBER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listProposalsReducer = (state = {}, action) => {
  switch (action.type) {
    case c.LIST_PROP_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.LIST_PROP_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.LIST_PROP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProposalReducer = (state = {}, action) => {
  switch (action.type) {
    case c.GET_PROP_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.GET_PROP_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.GET_PROP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createProposalReducer = (state = {}, action) => {
  switch (action.type) {
    case c.CREATE_PROP_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.CREATE_PROP_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.CREATE_PROP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const positiveVoteReducer = (state = {}, action) => {
  switch (action.type) {
    case c.POSITIVE_PROP_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.POSITIVE_PROP_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.POSITIVE_PROP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const negativeVoteReducer = (state = {}, action) => {
  switch (action.type) {
    case c.NEGATIVE_PROP_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.NEGATIVE_PROP_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.NEGATIVE_PROP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
