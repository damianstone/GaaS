import React, { useState, useEffect } from "react";
import axios from "axios";

const ParliamentAnnouncements = () => {
  const [commonAnnouncements, setCommonAnnouncements] = useState([]);
  const [lordsAnnouncements, setLordsAnnouncements] = useState([]);

  const handleCommonsVote = (id, vote) => {
    // send a post request to the backend API with the voting data
    axios.post(`/api/commonAnnouncements/${id}/vote`, { vote }).then((response) => {
      // update the state with the new vote count
      setCommonAnnouncements((prevAnnouncements) =>
        prevAnnouncements.map((announcement) =>
          announcement.id === id ? { ...announcement, votes: response.data.votes } : announcement
        )  
      );
    });
  };

  const handleLordsVote = (id, vote) => {
    // send a post request to the backend API with the voting data
    axios.post(`/api/lordsAnnouncements/${id}/vote`, { vote }).then((response) => {
      // update the state with the new vote count
      setLordsAnnouncements((prevAnnouncements) => 
        prevAnnouncements.map((announcement) =>
          announcement.id === id ? { ...announcement, votes: response.data.votes } : announcement
       )
      );
    });
  };
  
  // fetch data for announcements from backend API
  useEffect(() => {
    axios.get("/api/commonAnnouncements").then((response) => setCommonAnnouncements(response.data));
    axios.get("/api/lordsAnnouncements").then((response) => setLordsAnnouncements(response.data));
  }, []);

  return (
    <div className = "parliament-announcements">
      <div className = "common-announcements">
        <h2>
          Commons Announcements
        </h2>
        {commonAnnouncements.map((announcement) => (
          <div key={announcement.id}>
            <h3>
              {announcement.title}
            </h3>
            <p>
              {announcement.description}
            </p>
            <button onClick={() => handleCommonsVote(announcement.id, "yes")}>
              Yes
            </button>
            <button onClick={() => handleCommonsVote(announcement.id, "no")}>
              No
            </button>
            <p>
              Votes: {announcement.votes}
            </p>
          </div>
        ))}
      </div>
      <div className = "lords-announcements">
        <h2>
          Lords Announcements
        </h2>
        {lordsAnnouncements.map((announcement) => (
          <div key={announcement.id}>
            <h3>
              {announcement.title}
            </h3>
            <p>
              {announcement.description}
            </p>
            <button onClick={() => handleLordsVote(announcement.id, "yes")}>
              Yes
            </button>
            <button onClick={() => handleLordsVote(announcement.id, "no")}>
              No
            </button>
            <p>
              Votes: {announcement.votes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParliamentAnnouncements;