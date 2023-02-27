import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Proposal = (props) => {
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

  return (
    <div className='proposalContainer'>
      <div className='propTitleContainer'>
        <p className='propTitle'>{props.title}</p>
      </div>
      <div className='propSumContainer'>
        <p className='propSum'>{props.summary}</p>
      </div>
      <div className='propContContainer'>
        <p className='propCont'>{props.content}</p>
      </div>
      <div>
        {loadingNegative || (loadingPositive && <p>Loading...</p>)}
        {dataPositive && <p className="positive">You voted positive!!</p>}
        {dataNegative && <p className="negative">You voted negative!!</p>}
      </div>
      <div className='bContainer'>
        <div className='buttonContainer'>
          <p>{props.pv_porcentage}% Positive votes</p>
          <p className='positiveButton' onClick={props.handlePositive}>
            Vote Positive
          </p>
        </div>
        <div className='buttonContainer'>
          <p>{props.nv_porcentage}% Negative votes</p>
          <p className='negativeButton' onClick={props.handleNegative}>
            Vote Negative
          </p>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
