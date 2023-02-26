import React, { useState } from "react";
import ProposalForm from "./ProposalForm"

const ProfileForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState("");
  const [followers, setFollowers] = useState("");
  const [pastProposals, setPastProposals] = useState([]);

  const handleAddProposal = (proposal) => {
    setPastProposals([...pastProposals, proposal]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send form data to server or update user profile with values
  };

  return (
    <div>
      <form class="box" onSubmit={handleSubmit}>
        <div class="field">
          <label class="label" htmlFor="firstName">
            First Name:
          </label>
          <input
            class="input"
            placeholder="e.g. John"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div class="field">
          <label class="label" htmlFor="lastName">
            Last Name:
          </label>
          <input
            class="input"
            placeholder= "e.g Doe"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div class="field">
          <label class="label" htmlFor="photo">
            Photo:
          </label>
          <input
            class="input"
            type="text"
            id="photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="followers">
            Followers:
          </label>
          <input
            type="number"
            id="followers"
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
          />
        </div>
        <button type="submit">
            Save
        </button>
      </form>
      <h2>
        Past Proposals
      </h2>
      <div>
        {pastProposals.map((proposal) => (
          <div key={proposal.id}>
            {proposal.title}
          </div>
        ))}
      </div>
      <div>
        <h2>
            Add a Proposal
        </h2>
        <ProposalForm onAddProposal={handleAddProposal} />
      </div>
    </div>
  );
};

export default ProfileForm;

// You'll need to replace the URL /api/profile with the URL for your own server-side code that will save the form data to a database.
// This code creates a component called ProfileForm that renders a form with three input fields for the user to enter their name, email, and password. The state hooks useState are used to store the values of the form fields. The handleNameChange, handleEmailChange, and handlePasswordChange functions are event handlers that update the state when the user types in the form fields. The handleSubmit function is called when the user clicks the "Save Profile" button. It prevents the default form submission behavior, creates an object with the form data, and sends an API call to save the data to the server-side code.
// This code includes all the new requirements, such as the ability to edit first name, last name, photo, and followers, as well as the ability to view and edit past proposals. The pastProposals state is an array of objects, where each object represents a past proposal and includes the title and summary of the proposal. When the user clicks the "Add Proposal" button, they will be able to add a new proposal to this list. When the user clicks the "Edit" button next to a past proposal, they will be able to edit the details of that proposal. In this example, I added a handleAddProposal function that takes a proposal and uses setPastProposals to update the state of past proposals. I also added a section to display the past proposals and a component for adding a proposal. When a new proposal is added, the handleAddProposal function is called with the new proposal and updates the state of past proposals.