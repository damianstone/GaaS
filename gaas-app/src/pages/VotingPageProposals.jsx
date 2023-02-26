import React, { useState } from 'react';
import ProposalForm from './ProposalForm';
import ProposalLeaderboard from './ProposalLeaderboard';

const VotingPageProposals = () => {
  const [proposals, setProposals] = useState([
    { 
        id: 1, 
        title: 'Proposal', 
        description: 'This is a proposal', 
        votes: 0 
    },
  ]);

  const handleVote = (id) => {
    const updatedProposals = proposals.map((proposal) => {
      if (proposal.id === id) {
        return {
          ...proposal,
          votes: proposal.votes + 1,
        };
      }
      return proposal;
    });
    setProposals(updatedProposals);
  };

  return (
    <div class="box">
      <div>
        <h2>Vote for Proposals</h2>
        <div className="proposal-list">
          {proposals.map((proposal) => (
            <proposal
              key={proposal.id}
              proposal={proposal}
              onVote={handleVote}
            />
          ))}
        </div>
        <ProposalLeaderboard proposals={proposals} />
      </div>
      <div className="voting-page">
        <h1>Proposals</h1>
        <div className="proposal-form-container">
          <ProposalForm />
        </div>
        <div className="proposal-leaderboard-container">
          <ProposalLeaderboard />
        </div>
      </div>
    </div>
  );
};

export default VotingPageProposals;

// This code includes both the list of proposals with the ability to vote for them, and the proposal leaderboard component that displays the proposals ranked by number of votes. The handleVote function updates the state of the proposals array whenever a proposal is voted on. The ProposalLeaderboard component receives the proposals array as a prop and uses it to render the leaderboard.
// This is the complete code for the VotingPageProposals component that includes both the list of proposals with the ability to vote for them, and the proposal leaderboard component that displays the proposals ranked by number of votes. The handleVote function updates the state of the proposals array whenever a proposal is voted on. The ProposalLeaderboard component receives the proposals array as a prop and uses it to render the leaderboard.