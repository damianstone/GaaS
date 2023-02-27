import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Proposal from '../../components/Proposal';
import * as f from '../../store/actions/actions';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [auth, setAuth] = useState(null);

  const proposalsRed = useSelector((state) => state.listProposals);
  const { loading, data: proposals, error } = proposalsRed;

  const positiveReducer = useSelector((state) => state.positiveVote);
  const {
    loading: loadingPositive,
    data: dataPositive,
    error: errorPositive,
  } = positiveReducer;

  const negativeReducer = useSelector((state) => state.negativeVote);
  const {
    loading: loadingNegative,
    data: dataNegative,
    error: errorNegative,
  } = negativeReducer;

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem('@userData');
    setAuth(valueFromLocalStorage);

    if (auth && !auth.token) {
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    dispatch(f.listProposals());
  }, [dataPositive, dataNegative, dispatch]);

  const handleLogout = () => {
    dispatch(f.logout());
  };

  const handlePositive = (id) => {
    dispatch(f.positiveVote(id));
  };

  const handleNegative = (id) => {
    dispatch(f.negativeVote(id));
  };

  const handleCreate = () => {
    history.push('/create-porposal');
  };

  return (
    <div className='homeScreen'>
      <div className='titleContainer'>
        <div className='profileContainer'>
          <div className='avatar'>
            <p className='initials'>DS</p>
          </div>
          <div className='logoutcom'>
            <p className='logoutText' onClick={handleLogout}>
              LOGOUT
            </p>
          </div>
        </div>
        <h3 className='title'>GaaS - Proposals</h3>
        <div className='createContainerButton'>
          <p className='createButton' onClick={handleCreate}>
            Create Proposal
          </p>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='proposalSection'>
          {proposals &&
            proposals.results.map((proposal) => (
              <Proposal
                title={proposal.title}
                summary={proposal.summary}
                content={proposal.content}
                pv_porcentage={proposal.pv_porcentage}
                nv_porcentage={proposal.nv_porcentage}
                handlePositive={() => handlePositive(proposal.id)}
                handleNegative={() => handleNegative(proposal.id)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
