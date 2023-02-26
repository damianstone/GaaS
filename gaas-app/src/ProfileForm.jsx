import React, { useState } from "react";

function ProposalForm() {
  const [proposal, setProposal] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      proposal: proposal,
      description: description,
    };

    // Send the data to the backend using fetch or axios
    fetch('/api/proposals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Clear the form inputs
    setProposal("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Proposal:
        <input
          type="text"
          name="proposal"
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export default ProposalForm;

// In this example, the ProposalForm component is a form with two input fields for the title and description of the proposal. The handleSubmit function sends a POST request to the /api/proposals endpoint with the title and description data in the request body using the axios library. If the request is successful, the form fields are cleared and the user is notified that the proposal was created successfully. If there is an error during the request, the error is logged to the console and the user is notified of the error.
// In this modified version, we have added the name attributes to the form inputs for proposal and description, and we have also set up an onSubmit function that sends the form data to the backend using the fetch API. The handleSubmit function is called when the form is submitted, and it prevents the default form submission behavior, creates a data object with the form values, and sends a POST request to the backend with that data. Note that the fetch API is used here to make a request to the backend API. The URL /api/proposals assumes that the backend is set up to receive POST requests at that endpoint, and that it will handle the request appropriately. The response from the server is logged to the console for debugging purposes.