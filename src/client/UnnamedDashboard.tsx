import { useState, useEffect } from "react";

import { WaypointsList } from "../server/navigation";
import { PostRequestBody } from "../server/server";
import { GameError } from "./App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataList } from "./DataList";
import { findTrait } from "../server/navigation";

type FetchWaypointsData = {
    data: WaypointsList;
    meta: {
        total: number;
        page: number;
        limit: number;
    };
};

const typeColors: {[index: string]: string} = {
    "PLANET": "shadow-blue-500",
    "GAS_GIANT": "shadow-rose-700",
    "MOON": "shadow-slate-100",
    "ORBITAL_STATION": "shadow-emerald-300",
    "JUMP_GATE": "shadow-violet-400",
    "ASTEROID_FIELD": "shadow-yellow-800"

}


const waypointLabels = ["SYMBOL", "TYPE"];

export function UnnamedDashboard() {

    const [waypointsList, setWaypointsList] = useState<WaypointsList>([]);
    const [displayedWaypoints, setDisplayedWaypoints] = useState<WaypointsList>([]);

    async function handleSystemIDInput() {
        const systemID = document.getElementById("systemIDInput") as HTMLInputElement;
        const reqBody: PostRequestBody = {
            target: "/systems/waypoints",
            arguments: [systemID.value.toUpperCase()]
        };

        try {
            const res = await fetch('/systems/waypoints', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(reqBody)
            });
            const body: FetchWaypointsData | GameError = await res.json();
            if (!('data' in body)) {
                throw new Error(body.error.message);
            }
            console.log(body);
            setWaypointsList(body.data);
            setDisplayedWaypoints(body.data);
        } catch (err) {
            alert(err);
            console.log(err);
        }
    }

    useEffect(() => {
        const inputBox = document.getElementById("systemIDInput");
        inputBox?.addEventListener("keypress", (event) => {if (event.key === "Enter") handleSystemIDInput()})

        return () => {
            inputBox?.removeEventListener("keypress", (event) => {if (event.key === "Enter") handleSystemIDInput()})
        }
    }, [])

    return (
        <div>
            {!waypointsList.length && (
                <div className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-fit flex items-center gap-2 font-semibold">
                    <input id="systemIDInput" type="text" placeholder="ENTER SYSTEM ID" className="p-2 border-2 border-emerald-900 italic rounded bg-slate-900 text-emerald-100 outline-none" />
                </div>
            )}
            {(waypointsList.length > 0) && (
                <>
                    <section className="mb-6">
                        <select onChange={(event) => {
                            const value = event.target.value;
                            if (value !== "ALL") {
                                setDisplayedWaypoints(findTrait(value, waypointsList));
                            } else {
                                setDisplayedWaypoints(waypointsList);
                            }
                        }} className=" rounded bg-slate-800 p-2 px-6 appearance-none font-semibold border-2 border-emerald-900 text-emerald-100 outline-none">
                            <option value="ALL">ALL</option>
                            <option value="MARKETPLACE">MARKETPLACE</option>
                            <option value="SHIPYARD">SHIPYARD</option>
                        </select>
                    </section>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {displayedWaypoints.map((waypoint, index) => {
                            return (
                            <div key={index} className={`${typeColors[waypoint.type]} flex items-center rounded bg-slate-800 text-emerald-100 p-6 shadow`}>
                                <DataList labels={waypointLabels} data={[waypoint.symbol, waypoint.type]} />
                            </div>
                        )})}
                    </div>
                </>
            )}
        </div>
    );
};
