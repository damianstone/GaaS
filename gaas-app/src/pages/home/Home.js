import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as f from '../../store/actions/actions';
import './Home.css';

const Home = () => {
  const disptach = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.userLogin);
  const { loading: loadingUser, data: userInfo, error: errorUser } = user;

  const proposals = useSelector((state) => state.listProposals);
  const { loading, data, error } = proposals;

  useEffect(() => {
    f.listProposals();
  }, []);

  const handlePositive = () => {};

  const handleNegative = () => {};

  const handleCreate = () => {};

  // if (!userInfo) {
  //   history.push('/login');
  // }

  return (
    <div className='screen'>
      <div className='titleContainer'>
        <div className='avatar'>
          <p className='initials'>DS</p>
        </div>
        <h3 className='title'>GaaS - Proposals</h3>
        <div className='createContainerButton'>
          <p className='createButton' onClick={handleCreate}>
            Create Proposal
          </p>
        </div>
      </div>
      <div className='proposalSection'>
        <div className='proposalContainer'>
          <div className='propTitleContainer'>
            <p className='propTitle'>Ppop title</p>
          </div>
          <div className='propSumContainer'>
            <p className='propSum'>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here',
            </p>
          </div>
          <div className='propContContainer'>
            <p className='propCont'>
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum
            </p>
          </div>
          <div className='bContainer'>
            <div className='buttonContainer'>
              <p>70% Positive votes</p>
              <p className="positiveButton" onClick={handlePositive}>Vote Positive</p>
            </div>
            <div className='buttonContainer'>
              <p>30% Negative votes</p>
              <p className="negativeButton" onClick={handleNegative}>Vote Negative</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
