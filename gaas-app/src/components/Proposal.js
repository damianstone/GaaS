import React from "react";

const Proposal = (props) => {
  return (
    <div className="proposalContainer">
      <div className="propTitleContainer">
        <p className="propTitle">{props.title}</p>
      </div>
      <div className="propSumContainer">
        <p className="propSum">{props.summary}</p>
      </div>
      <div className="propContContainer">
        <p className="propCont">{props.content}</p>
      </div>
      <div className="bContainer">
        <div className="buttonContainer">
          <p>{props.pv_porcentage}% Positive votes</p>
          <p className="positiveButton" onClick={props.handlePositive}>
            Vote Positive
          </p>
        </div>
        <div className="buttonContainer">
          <p>{props.nv_porcentage}% Negative votes</p>
          <p className="negativeButton" onClick={props.handleNegative}>
            Vote Negative
          </p>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
