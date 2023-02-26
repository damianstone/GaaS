import React, { useState } from 'react';

function ProposalLeaderboard() {
  const [proposals, setProposals] = useState([
    { 
        id: 1, 
        title: 'Proposal', 
        votes: 0 
    },  
  ]);

  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (id) => {
    if(!hasVoted) {
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
      setHasVoted(true);
    }
  };

  const sortedProposals = [...proposals].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h1>
        Proposals
      </h1>
      <ul>
        {sortedProposals.map((proposal) => (
          <li key={proposal.id}>
            {proposal.title} - {proposal.votes} votes
            <button onClick={() => handleVote(proposal.id)}>Vote</button>
          </li>
        ))}
      </ul>
      {hasVoted ? (
        <p>Thank you for your vote!</p>
      ) : (
        <p>Please vote for a proposal!</p>
      )}
    </div>
  );
}

export default ProposalLeaderboard;

// This code creates a component called ProposalLeaderboard that displays a list of proposals and allows the user to vote for one of them. The state hooks useState are used to store the list of proposals and whether the user has voted yet. The handleVote function is called when the user clicks the "Vote" button next to a proposal's title. If the user hasn't voted yet, the function updates the votes property of the selected proposal in the proposals state, sets the hasVoted state to true, and prevents the user from voting again. The component renders a list of proposals with a "Vote" button next to each one. The proposals are sorted in descending order based on their number of votes. If the user has already voted, a "Thank you for your vote!" message is displayed. Otherwise, a "Please vote for a proposal." message is displayed.
// The main difference between the proposal list (ProposalLeaderboard) and the candidate list (VotingPageCandidates) is that the proposals are displayed in a leaderboard style based on the number of votes each proposal has received. The sortedProposals array is created by sorting the original proposals array in descending order based on the votes property of each proposal, so the proposals with the highest number of votes are displayed at the top of the list. This creates a leaderboard-style view of the proposals that allows users to quickly see which proposals are the most popular.