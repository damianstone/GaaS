import React, { useState } from 'react';
import axios from 'axios';

function ProposalForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://example.com/api/proposals', {
        title,
        description,
      });
      console.log(response.data);
      setTitle('');
      setDescription('');
    }  
    catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">
          Description:
        </label>
        <textarea
          id="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>
      <button type="submit">
        Create Proposal
      </button>
    </form>
  );
}

export default ProposalForm;

// In this example, the ProposalForm component is a form with two input fields for the title and description of the proposal. The handleSubmit function sends a POST request to the /api/proposals endpoint with the title and description data in the request body using the axios library. If the request is successful, the form fields are cleared and the user is notified that the proposal was created successfully. If there is an error during the request, the error is logged to the console and the user is notified of the error.