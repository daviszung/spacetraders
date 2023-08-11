
type NavbarProps = {
    currentDashboard: string;
    setCurrentDashboard: Function;
};

export function Navbar({ currentDashboard, setCurrentDashboard }: NavbarProps) {

    return (
        <nav className="flex items-center px-32 border-b border-emerald-900">
            <div className="flex py-4 gap-4">
                <button onClick={() => {
                    setCurrentDashboard("agent");
                }} className={`${currentDashboard === "agent" ? "text-amber-300" : "text-slate-700 bg-transparent"} px-6 py-2 text-xl font-bold`}>AGENT</button>
                <button onClick={() => {
                    setCurrentDashboard("contract");
                }} className={`${currentDashboard === "contract" ? "text-amber-300" : "text-slate-700 bg-transparent"} px-6 py-2 text-xl font-bold`}>CONTRACTS</button>
                <button onClick={() => {
                    setCurrentDashboard("ships");
                }} className={`${currentDashboard === "ships" ? "text-amber-300" : "text-slate-700 bg-transparent"} px-6 py-2 text-xl font-bold`}>SHIPS</button>
                <button onClick={() => {
                    setCurrentDashboard("navigation");
                }} className={`${currentDashboard === "navigation" ? "text-amber-300" : "text-slate-700 bg-transparent"} px-6 py-2 text-xl font-bold`}>NAVIGATION</button>
                <button onClick={() => {
                    setCurrentDashboard("unnamed");
                }} className={`${currentDashboard === "unnamed" ? "text-amber-300" : "text-slate-700 bg-transparent"} px-6 py-2 text-xl font-bold`}>UNNAMED</button>
            </div>
        </nav>
    );
};
