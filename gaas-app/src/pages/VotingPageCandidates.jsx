import React, { useState } from 'react';

function VotingPageCandidates() {
  const [candidates, setCandidates] = useState([
    { 
        id: 1, 
        name: 'Candidate', 
        votes: 0 
    },
  ]);

  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  const handleCandidateSelection = (candidateId) => {
    if(!hasVoted) {
        setSelectedCandidateId(candidateId);
    }
  };

  const handleVoteSubmission = () => {
    if (selectedCandidateId != null) {
      const updatedCandidates = candidates.map((candidate) => {
        if (candidate.id === selectedCandidateId) {
          return {
            ...candidate,
            votes: candidate.votes + 1,
          };
        }
        return candidate;
      });
    setCandidates(updatedCandidates);
    setHasVoted(true);    
    }
  }; 

  return (
    <div class="box">
      <h1>
        VotingPage
      </h1>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name}
            <button onClick={() => handleCandidateSelection(candidate.id)}>Select</button>
            {hasVoted && selectedCandidateId === candidate.id && <span>Voted</span>}
          </li>
        ))}
      </ul>
      {hasVoted ? (
        <p>
          Thank you for your vote!
        </p>
      ) : (
        <button onClick={handleVoteSubmission}>
          Submit Vote
        </button>
      )}
      <h2>
        Electoral/Poll Results
      </h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name} : {candidate.votes} votes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VotingPageCandidates;

// This code creates a component called VotingPageCandidates that displays a list of candidates and allows the user to vote for one of them. The state hooks useState are used to store the list of candidates, the ID of the selected candidate, and whether the user has voted yet. The handleCandidateSelection function is called when the user clicks the "Select" button next to a candidate's name. If the user hasn't voted yet, the function sets the selectedCandidateId state to the ID of the candidate. The handleVoteSubmission function is called when the user clicks the "Submit Vote" button. If the user has selected a candidate, the function updates the votes property of the selected candidate in the candidates state, sets the hasVoted state to true, and prevents the user from voting again. The component renders a list of candidates with a "Select" button next to each one. If the user has already voted, the "Select" button is disabled and a "Voted" message is displayed next to the selected candidate. If the user hasn't voted yet, a "Submit Vote" button is displayed instead. 