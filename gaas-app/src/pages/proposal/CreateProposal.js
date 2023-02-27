import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as f from "../../store/actions/actions";

import Input from "../../components/Input";
import Textarea from "../../components/TextArea";
import "./CreateProposal.css";

const CreateProposal = () => {
  const disptach = useDispatch();
  // const history = useHistory();

  const [title, setTitle] = useState(false);
  const [summary, setSummary] = useState(null);
  const [content, setContent] = useState(null);

  const proposalReducer = useSelector((state) => state.createProposal);
  const { loading, data, error } = proposalReducer;

  const handleCreateProposal = () => {
    console.log("emak");
    // console.log(f.createProposal(title, summary, content));
    disptach(f.createProposal(title, summary, content));
    console.log(data);
    console.log(error);
  };

  return (
    <div className="screen">
      <div className="welcomeContainer">
        <h3 className="welcomeText">Create Proposal</h3>
      </div>
      {/* {registerError ||
        (loginError && <p className='text'>Ups there is an error</p>)}
      {loadingLogin || loadingRegister ? (
        <p className='text'>Loading...</p>
      ) : (
       </div>  */}

      <div className="inputContainer">
        <label>Title:</label>
        <Textarea
          onChange={(text) => setTitle(text)}
          label="Title"
          value={title}
        />
        {/* <Input
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          value={title}
        /> */}
        {/* <Input
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
          label="summary"
        /> */}
        <label>Summary:</label>
        <Textarea onChange={(text) => setSummary(text)} value={summary} />
        <label>Content:</label>
        <Textarea onChange={(text) => setContent(text)} value={content} />
      </div>
      {/* {loading ? (<p className="text">Loading...</p>) : (null))} */}
      <div className="createContainerButton">
        <p className="createButton" onClick={handleCreateProposal}>
          Create Proposal
        </p>
      </div>
    </div>
  );
};

export default CreateProposal;
