export type AgentDetails = {
    accountId: string;
    symbol: string;
    headquarters: string;
    credits: number;
    startingFaction: string;
};

type NavbarProps = {
    setAgentDetails: Function
}

export function Navbar({setAgentDetails}: NavbarProps) {

    async function requestAgentDetails() {
        const res = await fetch('/agent', {
            headers: {
                "content-type": "application/json",
            }
        });
        const body: AgentDetails = await res.json();
        console.log(body);
        return body;
    }

    return (
        <nav className="flex items-center px-16 border-b border-emerald-700">
            <div className="px-32 py-10">
                <button onClick={async () => {
                    const agentDetails = await requestAgentDetails();
                    setAgentDetails(agentDetails)

                }} className="rounded-xl bg-emerald-500 px-4 py-2 text-white font-semibold">Agent</button>

            </div>
        </nav>
    );
};
