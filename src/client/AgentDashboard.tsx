import { useState, useEffect } from "react";
import { DataList } from "./DataList";


export type AgentDetails = {
    accountId: string;
    symbol: string;
    headquarters: string;
    credits: number;
    startingFaction: string;
};

export function AgentDashboard() {

    const [agentDetails, setAgentDetails] = useState<AgentDetails>();
    
    const labels = ["SYMBOL", "HQ", "CREDITS", "FACTION"];

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
            {agentDetails && 
                <DataList labels={labels} data={[agentDetails.symbol, agentDetails.headquarters, agentDetails.credits, agentDetails.startingFaction]}></DataList>
            }
        </div>
    );
};
