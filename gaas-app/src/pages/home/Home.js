import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Proposal from "../../components/Proposal";
import * as f from "../../store/actions/actions";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [auth, setAuth] = useState(null);

  const proposalsRed = useSelector((state) => state.listProposals);
  const { loading, data: proposals, error } = proposalsRed;

  console.log(proposals);

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem("@userData");
    setAuth(valueFromLocalStorage);
  }, []);

  useEffect(() => {
    dispatch(f.listProposals());
  }, []);

  const handlePositive = () => {};

  const handleNegative = () => {};

  const handleCreate = () => {};

  if (auth && !auth.token) {
    history.push("/login");
  }

  return (
    <div className="homeScreen">
      <div className="titleContainer">
        <div className="avatar">
          <p className="initials">DS</p>
        </div>
        <h3 className="title">GaaS - Proposals</h3>
        <div className="createContainerButton">
          <p className="createButton" onClick={handleCreate}>
            Create Proposal
          </p>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="proposalSection">
          {proposals &&
            proposals.results.map((proposal) => (
              <Proposal
                title={proposal.title}
                summary={proposal.summary}
                content={proposal.content}
                pv_porcentage={proposal.pv_porcentage}
                nv_porcentage={proposal.nv_porcentage}
                handlePositive={handlePositive}
                handleNegative={handleNegative}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
