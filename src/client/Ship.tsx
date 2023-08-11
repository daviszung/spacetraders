import { useState } from "react";
import { faLocationCrosshairs, faWrench, faRocket, faCubes } from "@fortawesome/free-solid-svg-icons";
import { Ship } from "./ShipsDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ShipProps = {
    ship: Ship;
};

const labels = ["NAME", "ROLE", "LOCATION"];

export function Ship({ ship }: ShipProps) {
    const [menu, setMenu] = useState<string>("registration");

    return (
        <div className="flex flex-col justify-between border border-emerald-500 rounded bg-slate-800 text-emerald-100 p-6 shadow-md shadow-emerald-900">
            <div className="flex">
                <ul className="font-semibold text-lg gap-2 mr-8">
                    {labels.map((label, index) =>
                        <li key={index}>{label.toUpperCase()}</li>
                    )}
                </ul>
                <ul className="font-semibold text-lg gap-2 italic text-emerald-600">
                    <li>{ship.registration.name}</li>
                    <li>{ship.registration.role}</li>
                    <li>{ship.nav.status} AT {ship.nav.waypointSymbol}</li>
                </ul>
            </div>
            <div id="hotbar" className="mt-4 flex items-center gap-6">
                <FontAwesomeIcon onClick={() => setMenu("registration")} className={`${menu === "registration" ? "border-amber-300" : "border-emerald-500"} bg-slate-700  border p-2 rounded scale-125`} icon={faRocket} />
                <FontAwesomeIcon onClick={() => setMenu("nav")} className={`${menu === "nav" ? "border-amber-300" : "border-emerald-500"} bg-slate-700 border p-2 rounded scale-125`} icon={faLocationCrosshairs} />
                <FontAwesomeIcon onClick={() => setMenu("tech")} className={`${menu === "tech" ? "border-amber-300" : "border-emerald-500"} bg-slate-700 border p-2 rounded scale-125`} icon={faWrench} />
                <FontAwesomeIcon onClick={() => setMenu("cargo")} className={`${menu === "cargo" ? "border-amber-300" : "border-emerald-500"} bg-slate-700 border p-2 rounded scale-125`} icon={faCubes} />
            </div>
        </div>
    );
};
