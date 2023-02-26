import React, { useState, useEffect } from "react";
import axios from "axios";

function GovernmentAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [vote, setVote] = useState(false);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    axios
      .get("https://example.com/government/announcements")
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios 
      .get("https://example.com/government/proposals")
      .then((response) => {
        setProposals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setVote(false);
  };

  const handleVoteClick = () => {
    setVote(!vote);
  };

  return (
    <div>
      <h2>
        Government Announcements and Proposals
      </h2>
      <div className="announcements-container">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`announcement ${selectedAnnouncement === announcement ? "selected" : ""}`}
            onClick={() => handleAnnouncementClick(announcement)}
          >  
            <h3>
              {announcement.title}
            </h3>
            <p>
              {announcement.description}
            </p>
            {selectedAnnouncement === announcement && (
              <div className="announcement-details">
                <h4>
                  Details
                </h4>
                <p>
                  {announcement.details}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedAnnouncement && (
        <div className="announcement-vote">
          <h3>
            Vote
          </h3>
          <div className="vote-buttons">
            <button className={`positive ${vote ? "selected" : ""}`} onClick={handleVoteClick}>
              Positive
            </button>
            <button className={`negative ${vote ? "selected" : ""}`} onClick={handleVoteClick}>
              Negative
            </button>
          </div>
          <div className="voters">
            <h4>
              Politicians
            </h4>
            <ul>
              {/* fetch politicians' data from API */}
            </ul>
            <h4>
              Public
            </h4>
            <ul>
              {/* fetch public data from API */}
            </ul>
          </div>
        </div>
      )}
      <div className="proposals-container">
        <h3>
          Proposals
        </h3>
        {proposals.map((proposal) => (
          <div key={proposal.id} className="proposal">
            <h4>
              {proposal.title}
            </h4>
            <p>
              {proposal.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GovernmentAnnouncements;