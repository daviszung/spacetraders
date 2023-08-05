import { useState, useEffect } from "react";


type AgentDetails = {
    accountId: string;
    symbol: string;
    headquarters: string;
    credits: number;
    startingFaction: string;
};

export function AgentDashboard() {

    const [agentDetails, setAgentDetails] = useState<AgentDetails>();

    useEffect(() => {
        fetch('/agent', {
            headers: {
                "content-type": "application/json",
            }
        })
        .then(res => res.json())
        .then(res => setAgentDetails(res as AgentDetails))
        .catch(err => console.log(err))

    }, [])

    return (
        <div>
            <div className="flex">
                <ul className="font-semibold text-lg gap-2 mr-8">
                    <li>SYMBOL</li>
                    <li>HQ</li>
                    <li>CREDITS</li>
                    <li>FACTION</li>
                </ul>
                {agentDetails &&
                    <ul className="font-semibold text-lg gap-2 italic text-emerald-600">
                        <li>{agentDetails.symbol}</li>
                        <li>{agentDetails.headquarters}</li>
                        <li>{agentDetails.credits}</li>
                        <li>{agentDetails.startingFaction}</li>
                    </ul>
                }
            </div>
        </div>
    );
};
