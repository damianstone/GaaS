import React, { useState, useEffect } from "react";
import axios from "axios";

function DailyOperations() {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    axios.get("https://api.virtualcountry.com/daily-operations").then((response) => {
      setOperations(response.data);
    });
  }, []);

  return (
    <div>
      <h2>
        Daily Operations
      </h2>
      <div className="operation-list">
        {operations.map((operation) => (
          <div key={operation.id} className="operation-item">
            <h3>
              {operation.title}
            </h3>
            <p>
              {operation.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyOperations;