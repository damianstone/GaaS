import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  userRegisterReducer,
  userLoginReducer,
  followUserReducer,
  listMemberReducer,
  getMemberReducer,
  approveMemberReducer,
  disapproveMemberReducer,
  listProposalsReducer,
  getProposalReducer,
  createProposalReducer,
  positiveVoteReducer,
  negativeVoteReducer,
} from './reducers/reducers';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  followUser: followUserReducer,
  listMembers: listMemberReducer,
  getMember: getMemberReducer,
  approveMember: approveMemberReducer,
  disapproveMember: disapproveMemberReducer,
  listProposals: listProposalsReducer,
  getProposal: getProposalReducer,
  createProposal: createProposalReducer,
  positiveVote: positiveVoteReducer,
  negativeVote: negativeVoteReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
