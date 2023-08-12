import { useState } from "react";
import { Navbar } from "./Navbar";

import { ContractDashboard } from "./ContractDashboard";
import { AgentDashboard } from "./AgentDashboard";
import { ShipsDashboard } from "./ShipsDashboard";
import { NavigationDashboard } from "./NavigationDashboard";
import { UnnamedDashboard } from "./UnnamedDashboard";

type Dashboards = "agent" | "contract"

export type GameError = {
    error: {
        code: number;
        message: string;
    };
}

const dashboards = {
    agent: <AgentDashboard />,
    contract: <ContractDashboard />,
    ships: <ShipsDashboard />,
    navigation: <NavigationDashboard />,
    unnamed: <UnnamedDashboard />

}

export function App() {
    const [currentDashboard, setCurrentDashboard] = useState<Dashboards>("agent")

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Navbar setCurrentDashboard={setCurrentDashboard} currentDashboard={currentDashboard}/>
            <main className="px-32 py-10">
                {dashboards[currentDashboard]}
            </main>

        </div>
    );
};
