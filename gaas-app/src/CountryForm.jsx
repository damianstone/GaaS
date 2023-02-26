import React, { useState } from "react";

const CountryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [currency, setCurrency] = useState("");
  const [governmentType, setGovernmentType] = useState("");
  const [population, setPopulation] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = (e) => {
    e.preventdefault();
    // Handle the form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">
          Country Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
         /> 
      </div>
      <div>
        <label htmlFor="location">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label hmtlFor="currency">
          Currency:
        </label>
        <input
          type="text"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </div>
      <div>
        <label hmtlFor="governmentType">
          Government Type:
        </label>
        <input
          type="text"
          id="governmentType"
          value={governmentType}
          onChange={(e) => setGovernmentType(e.target.value)}
        />
      </div>
      <div>
        <label hmtlFor="language">
          Official Language:
        </label>
        <input
          type="text"
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </div>
      <button type="submit">
        Create Virtual Country
      </button>
    </form>
  );
};

export default CountryForm;