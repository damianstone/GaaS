import React, { useState } from 'react';

function MonthlyRecord(props) {
  const { accomplishments } = props;

  return (
    <div>
      <h2>
        Monthly Record
      </h2>
      <table>
        <thead>
          <tr>
            <th>
              Month
            </th>
            <th>
              Accomplishments
            </th>
          </tr>
        </thead>
        <tbody>
          {accomplishments.map((item) => (
            <tr key={item.id}>
              <td>
                {item.month}
              </td>
              <td>
                {item.description}
              </td>
            </tr>
      ))}
        </tbody>
      </table>
    </div>
  );
}

function PerformanceRating(props) {
  const { monthlyRecords } = props;

  // Calculate the overall performance rating based on monthly records

  const totalAccomplishments = monthlyRecords.reduce((total, record) => {
    return total + record.accomplishments.length;  
}, 0);

  const averageRating = totalAccomplishments / monthlyRecords.length;

  return (
    <div>
      <h2>
        Performance Rating
      </h2>
      <p>
        Average Accomplishments: {averageRating}
      </p>
    </div>
  );
}

function ReelectionStatus(props) {
  const { performanceRating, threshold } = props;

  const isSuitableForReelection = performanceRating > threshold;

  return (
    <div>
      <h2>
        Reelection Status
      </h2>
      {isSuitableForReelection ? (
        <p>
          Suitable for Reelection
        </p>
      ) : (
        <p>
          Unsuitable for Reelection
        </p>
      )}
    </div>
  );
}

function PoliticianProfile(props) {
  const { name, party, monthlyRecords } = props;
  const threshold = 5; // predefined or predetermined threshold for the reelection suitability
  const { politician } = props;
  const [rating, setRating] = useState(politician.rating);

  function handleRatingChange(event) {
    setRating(event.target.value);
  }

  return (
    <div>
      <h1>
        Politician Profile
      </h1>
      <p>
        Name: {name}
      </p>
      <p>
        Party: {party}
      </p>
      <MonthlyRecord 
        accomplishments={monthlyRecords} 
      />
      <PerformanceRating
        monthlyRecords={monthlyRecords} 
      />
      <ReelectionStatus
        performanceRating={averageRating}
        threshold={threshold}
      />
      <h2>
        {politician.name}
      </h2>
      <div>
        Party: {politician.party}
      </div>
      <div>
        Term Start: {politician.termStart}        </div>
      <div>
        Term End: {politician.termEnd}
      </div>
      <div>
        Rating: 
        <input type="number" value={rating} onChange={handleRatingChange} 
        />
      </div>
      <div>
        <button>
          Save Rating
        </button>
      </div>
    </div>
  );
}

export default PoliticianProfile;

// The first component displays the monthly records for a politician. This component will receive a list of monthly accomplishments and display them in a table or a list.

// The second component displays the overall performance of a politician based on their monthly records. This component will receive a list of monthly records for the politician and calculate their average performance rating based on the accomplishments.

// The third component displays the reelection status of a politician based on their overall performance rating. This component will receive the overall performance rating and determine if the politician is suitable for reelection based on a predefined threshold.

// The fourth component displays the politician's information and passes the monthly records to the MonthlyRecord component, the performance rating to the PerformanceRating component, and the threshold to the ReelectionStatus component. In this example, the rating state variable is initialized with the initial rating value passed down through props. The handleRatingChange function is a callback function that updates the rating state whenever the rating input value changes. Finally, the current rating state is used to render the rating input value in the JSX.

// Could also use useState to manage other state variables, such as whether the save button has been clicked or to hold the updated rating value to be sent to the backend API.