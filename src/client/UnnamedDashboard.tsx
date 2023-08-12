import { useState } from "react";

import { WaypointsList } from "../server/navigation";
import { PostRequestBody } from "../server/server";
import { GameError } from "./App";

import { findTrait } from "../server/navigation";
import { Waypoint } from "./Waypoint";

type FetchWaypointsData = {
    data: WaypointsList;
    meta: {
        total: number;
        page: number;
        limit: number;
    };
};

export function UnnamedDashboard() {

    const [systemID, setSystemID] = useState<string>()
    const [waypointsList, setWaypointsList] = useState<WaypointsList>([]);
    const [displayedWaypoints, setDisplayedWaypoints] = useState<WaypointsList>([]);

    async function handleSystemIDInput() {
        const systemID = document.querySelector(".systemIDInput") as HTMLInputElement;
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
            setSystemID(systemID.value.toUpperCase())
            setWaypointsList(body.data);
            setDisplayedWaypoints(body.data);
        } catch (err) {
            alert(err);
            console.log(err);
        }
    }

    return (
        <div>
            {!waypointsList.length && (
                <div className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-fit flex items-center gap-2 font-semibold">
                    <input type="text" onKeyDown={(event) => {if (event.key === "Enter") handleSystemIDInput()}} placeholder="ENTER SYSTEM ID" className="systemIDInput p-2 border-2 border-emerald-900 italic rounded bg-slate-900 text-emerald-100 outline-none" />
                </div>
            )}
            {(waypointsList.length > 0) && (
                <>
                    <section className="flex justify-between items-center mb-6">
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
                        <input type="text" onKeyDown={(event) => {if (event.key === "Enter") handleSystemIDInput()}} placeholder={systemID} className="systemIDInput p-2 border-2 border-emerald-900 italic rounded bg-slate-900 text-emerald-100 outline-none" />

                    </section>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {displayedWaypoints.map((waypoint, index) => <Waypoint key={index} waypoint={waypoint} />)}
                    </div>
                </>
            )}
        </div>
    );
};
