
export function Navbar() {

    async function requestAgentDetails() {
        const res = await fetch('/agent', {
            headers: {
                "content-type": "application/json",
            }
        });
        const body = await res.json();
        console.log(body);
    }

    return (
        <nav className="flex items-center px-16 border-b border-emerald-700">
            <div className="px-32 py-10">
                <button onClick={requestAgentDetails} className="rounded-xl bg-emerald-500 px-4 py-2 text-white font-semibold">Agent</button>
            </div>
        </nav>
    );
};
