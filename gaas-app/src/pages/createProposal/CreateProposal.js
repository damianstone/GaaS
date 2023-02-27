import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as f from '../../store/actions/actions';

import Textarea from '../../components/Textarea';
import './CreateProposal.css';

const CreateProposal = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(false);
  const [summary, setSummary] = useState(null);
  const [content, setContent] = useState(null);

  const proposalReducer = useSelector((state) => state.createProposal);
  const { loading, data, error } = proposalReducer;

  const handleCreateProposal = () => {
    dispatch(f.createProposal(title, summary, content));
  };

  if (data) {
    dispatch({type: "CREATE_RESET"})
    history.goBack();
  }

  return (
    <div className='screen'>
      <div className='welcomeContainer'>
        <h3 className='welcomeText'>Create Proposal</h3>
      </div>
      <div className='inputContainer'>
        <label>Title:</label>
        <Textarea
          onChange={(text) => setTitle(text)}
          label='Title'
          value={title}
        />
        <label>Summary:</label>
        <Textarea onChange={(text) => setSummary(text)} value={summary} />
        <label>Content:</label>
        <Textarea onChange={(text) => setContent(text)} value={content} />
      </div>
      <div className='createContainerButton'>
        <p className='createButton' onClick={handleCreateProposal}>
          Create Proposal
        </p>
      </div>
    </div>
  );
};

export default CreateProposal;
