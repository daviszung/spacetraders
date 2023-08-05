
type NavbarProps = {
    setCurrentDashboard: Function
}

export function Navbar({setCurrentDashboard}: NavbarProps) {

    return (
        <nav className="flex items-center px-32 border-b border-emerald-600">
            <div className="flex py-4 gap-4">
                <button onClick={() => {
                    setCurrentDashboard("agent")
                }} className="rounded bg-emerald-900 px-4 py-2 text-emerald-300 font-semibold">Agent</button>
                <button onClick={() => {
                    setCurrentDashboard("contract");
                }} className="rounded bg-emerald-900 px-4 py-2 text-emerald-300 font-semibold">Contracts</button>
            </div>
        </nav>
    );
};
