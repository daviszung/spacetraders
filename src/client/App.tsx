import { useState } from "react";
import { Navbar } from "./Navbar";

import { ContractDashboard } from "./ContractDashboard";
import { AgentDashboard } from "./AgentDashboard";
import { ShipsDashboard } from "./ShipsDashboard";

type Dashboards = "agent" | "contract"

const dashboards = {
    agent: <AgentDashboard />,
    contract: <ContractDashboard />,
    ships: <ShipsDashboard />,
}

export function App() {
    const [currentDashboard, setCurrentDashboard] = useState<Dashboards>("agent")

    return (
        <div className="h-screen bg-slate-900 text-white">
            <Navbar setCurrentDashboard={setCurrentDashboard} currentDashboard={currentDashboard}/>
            <main className="px-32 py-10">
                {dashboards[currentDashboard]}
            </main>

        </div>
    );
};
