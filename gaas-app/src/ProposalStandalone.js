import React from 'react'

export default function ProposalStandalone() {
    return (
        <div id="profile">
            {item()}
        </div>
    )
}

function item() {
    return (
        <div className="flex">
            <div className="item">
                <img src="" alt=""/>
                <div className="info">
                    <h3 className="name text-dark">
                        Name
                    </h3>
                    <span>
                        Description
                    </span>
                </div>
            </div>
            <div className="item">
                <span>
                    Score
                </span>
            </div>
        </div>
    )
}