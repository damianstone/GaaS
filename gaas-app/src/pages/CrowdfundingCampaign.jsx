import React, { useState } from "react";

function CrowdfundingCampaign() {
  const [targetAmount, setTargetAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [donorList, setDonorList] = useState([]);

  function handleDonate(amount) {
    setCurrentAmount(currentAmount + amount);
    setDonorList([...donorList, { amount: amount, timestamp: new Date() }]);
  }

  function handleGoalChange(event) {
    setTargetAmount(event.target.value);
  }

  return (
    <div>
      <h1>
        Crowdfunding Campaign
      </h1>
      <p>
        Current amount raised: {currentAmount} / {targetAmount}
      </p>
      <progress max={targetAmount} value={currentAmount} />
      <label>
        Target amount:{" "}
        <input type="number" value={targetAmount} onChange={handleGoalChange} />
      </label>
      <br />
      <button onClick={() => handleDonate(10)}>
        Donate $10
      </button>
      <button onClick={() => handleDonate(20)}>
        Donate $20
      </button>
      <button onClick={() => handleDonate(50)}>
        Donate $50
      </button>
      <br />
      <h2>
        Donor List
      </h2>
      <ul>
        {donorList.map((donor, index) => (
          <li key={index}>
            ${donor.amount} donated on {donor.timestamp.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrowdfundingCampaign;

// This component allows users to set a target amount for the fundraising campaign, view the current amount raised and a progress bar to visualize it. Users can donate different amounts using the provided buttons or input field. All donations are tracked and displayed in a donor list. This component can be used to raise money and capital for starting a new country, and contributors would become direct stakeholders and owners in the country.