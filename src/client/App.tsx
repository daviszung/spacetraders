import { useState } from "react";
import { Navbar } from "./Navbar";

import { AgentDetails } from "./Navbar";


export function App() {
    const [agentDetails, setAgentDetails] = useState<AgentDetails>();

    console.log(agentDetails);

    return (
        <div className="h-screen bg-slate-900 text-white">
            <Navbar setAgentDetails={setAgentDetails} />
            <main>
                {agentDetails &&
                    <ul>
                        <li>{agentDetails.symbol}</li>
                        <li>{agentDetails.headquarters}</li>
                        <li>{agentDetails.credits}</li>
                        <li>{agentDetails.startingFaction}</li>
                    </ul>
                }
            </main>

        </div>
    );
};
