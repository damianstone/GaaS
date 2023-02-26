// import ProposalLeaderboard from './ProposalLeaderboard'
// import VotingPageCandidates from './VotingPageCandidates'
// import PoliticianProfile from './PoliticianProfile'
import {useState, useRef} from 'react'
import ProfileForm from './ProfileForm'
import Search from './Search'
// import GovernmentAnnouncements from './GovernmentAnnouncements'
import VotingPageProposals from './VotingPageProposals'
import VotingPageCandidates from './VotingPageCandidates'
import ProposalForm from './ProposalForm'
import ProposalLeaderboard from './ProposalLeaderboard'
import PoliticianProfile from './PoliticianProfile'
import CrowdfundingCampaign from './CrowdfundingCampaign'
import DailyOperations from './DailyOperations'
import CountryForm from './CountryForm'
import GovernmentAnnouncements from './GovernmentAnnouncements'
import ParliamentAnnouncements from './ParliamentAnnouncements'
import UserProfile from './UserProfile'


function Page () {
  const [sectionVisibility, setSectionVisibility] = useState({
    default: true,
    section1: false,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
    section7: false,
    section8: false,
    section9: false,
    section10: false,
    section11: false,
    section12: false,
    section13: false}
  );

  const handleButtonClick = (sectionName) => {
    const newSectionVisibility = {
      default: false,
      section1: false,
      section2: false,
      section3: false,
      section4: false,
      section5: false,
      section6: false,
      section7: false,
      section8: false,
      section9: false,
      section10: false,
      section11: false,
      section12: false,
      section13: false
    };
    newSectionVisibility[sectionName] = true;
    setSectionVisibility(newSectionVisibility);
  };
  
  return (
    
    <div class="is-paddingless">
      <nav class="navbar is-info" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
  
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a 
              className={`navbar-item ${sectionVisibility.section1 ? '' : 'is-outlined'}`}
              onClick={() => handleButtonClick('section1')}>
              Profile Form
            </a>
      
            <a 
              className={`navbar-item ${sectionVisibility.section2 ? '' : 'is-outlined'}`}
              onClick={() => handleButtonClick('section2')}>
              Search
            </a>
      
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>
      
              <div class="navbar-dropdown">
                <a 
                  className={`navbar-item ${sectionVisibility.section3 ? '' : 'is-outlined'}`}
                  onClick={() => handleButtonClick('section3')}>
                  Create Proposals
                </a>
                <a 
                  className={`navbar-item ${sectionVisibility.section4 ? '' : 'is-outlined'}`}
                  onClick={() => handleButtonClick('section4')}>
                  Parliament Announcements
                </a>
                <a 
                  className={`navbar-item ${sectionVisibility.section5 ? '' : 'is-outlined'}`}
                  onClick={() => handleButtonClick('section5')}>
                  Politician Profile
                </a>
                <a 
                  className={`navbar-item ${sectionVisibility.section6 ? '' : 'is-outlined'}`}
                  onClick={() => handleButtonClick('section6')}>
                  Proposal Form
                </a>
                <a 
                  className={`navbar-item ${sectionVisibility.section7 ? '' : 'is-outlined'}`}
                  onClick={() => handleButtonClick('section7')}>
                  Proposal Leaderboard
                </a>
                <a 
                  className={`navbar-item ${sectionVisibility.section7 ? '' : 'is-outlined'}`}
                  onClick={() => handleButtonClick('section10')}>
                  Crowd Funding Campaign
                </a>
                <a 
                  className={`navbar-item ${sectionVisibility.section7 ? '' : 'is-outlined'}`}
                  onClick={() => handleButtonClick('section11')}>
                  Daily Operations
                </a>
                <a 
                  className={`navbar-item ${sectionVisibility.section7 ? '' : 'is-outlined'}`}
                  onClick={() => handleButtonClick('section12')}>
                  Government Announcements
                </a>
                <a 
                  className={`navbar-item ${sectionVisibility.section7 ? '' : 'is-outlined'}`}
                  onClick={() => handleButtonClick('section13')}>
                  User Profile
                </a>    
              </div>
            </div>
          </div>
        </div>
    
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a 
                className={`button is-primary ${sectionVisibility.section8 ? '' : 'is-outlined'}`}
                onClick={() => handleButtonClick('section8')}>
                <strong>Voting Page</strong>
              </a>
              <a 
                className={`button is-light ${sectionVisibility.section9 ? '' : 'is-outlined'}`}
                onClick={() => handleButtonClick('section9')}>
                Voting Page Proposals
              </a>
            </div>
          </div>
        </div>
      </nav>
      <section class="hero is-fullheight-with-navbar">
        {sectionVisibility.default && (
        <section className="section">
          <h1>GAAS</h1>
{/*           <ProfileForm/> */}
        </section>
      )}
        {sectionVisibility.section1 && (
        <ProfileForm className="section"/>
      )}
      {sectionVisibility.section2 && (
        <Search className="section"/>
      )}
      {sectionVisibility.section3 && (
        <section className="section"/>
      )}
      {sectionVisibility.section4 && (
        <ParliamentAnnouncements className="section"/>
      )}
      {sectionVisibility.section5 && (
        <PoliticianProfile className="section"/>
      )}
      {sectionVisibility.section6 && (
        <ProposalForm className="section"/>
      )}
      {sectionVisibility.section7 && (
        <ProposalLeaderboard className="section"/>
      )}
      {sectionVisibility.section8 && (
        <VotingPageCandidates className="section"/>
      )}
      {sectionVisibility.section9 && (
        <VotingPageProposals className="section"/>
      )}
      {sectionVisibility.section10 && (
        <CrowdfundingCampaign className="section"/>
      )}
      {sectionVisibility.section11 && (
        <DailyOperations className="section"/>
      )}
      {sectionVisibility.section12 && (
        <GovernmentAnnouncements className="section"/>
      )}
      {sectionVisibility.section13 && (
        <UserProfile className="section"/>
      )}
      
      </section>
    </div>
  )
}

export default Page;