import React from 'react'
import ProposalStandalone from './ProposalStandalone'

export default function ProposalLeaderboard() {

    const handleClick = () => {
       console.log(e.target) 
    }

    return (
        <div className="board">
            <h1 className='leaderboard'>
                Proposal Leaderboard
            </h1>
            <div className='duration'>
                <button onClick={handleClick} data-id='7'>
                    Last Week
                </button>
                <button onClick={handleClick} data-id='30'>
                    Last Month
                </button>
                <button onClick={handleClick} data-id='0'>
                    All-Time
                </button>
            </div>
            <ProposalStandalone></ProposalStandalone>
        </div>
    )
}