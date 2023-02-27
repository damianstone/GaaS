import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as f from '../../store/actions/actions';
import './MyProfile.css';

const MyProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.userLogin);
  const { loading, data, error } = useSelector((state) => state.listProposals);

  useEffect(() => {
    dispatch(f.listProposals());
  }, []);

  if (!user) {
    history.push('/login');
  }

  return (
    <div className='myProfile'>
      <h1>My Profile</h1>
      <div className='userInfo'>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <div className='proposals'>
        <h2>My Proposals</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          data.map((proposal) => (
            <div key={proposal.id} className='proposal'>
              <p>{proposal.title}</p>
              <p>{proposal.summary}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyProfile;
