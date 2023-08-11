import { useState } from "react";

import { WaypointsList } from "../server/navigation";
import { PostRequestBody } from "../server/server";

function handleSystemIDInput() {
    const systemID = document.getElementById("systemIDInput") as HTMLInputElement;
    const reqBody: PostRequestBody = {
        target: "/systems/waypoints",
        arguments: [systemID.value]
    };


    fetch('/systems/waypoints', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        return res as WaypointsList
    })
    .catch(err => {
        console.log(err)
    })
}

export function UnnamedDashboard(){
    const [waypointsList, setWaypointsList] = useState<WaypointsList>()
  
  return (
    <div>
        <input id="systemIDInput" type="text" placeholder="ENTER SYSTEM ID" className=" bg-slate-600 text-white"/>
        <button onClick={() => {
            const waypointsData: any = handleSystemIDInput()
            setWaypointsList(waypointsData)
            }}>Submit</button>
      
    </div>
  )
};
