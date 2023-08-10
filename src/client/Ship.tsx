import { faLocationCrosshairs, faWrench } from "@fortawesome/free-solid-svg-icons";
import { Ship } from "./ShipsDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ShipProps = {
    ship: Ship
}

const labels = ["NAME", "ROLE", "LOCATION"];

export function Ship({ship} : ShipProps){
  
  return (
      <div className="flex flex-col border border-emerald-500 rounded bg-slate-800 text-emerald-100 p-6 shadow-md shadow-emerald-900">
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
          <div id="hotbar" className="h-10 flex gap-2">
            <FontAwesomeIcon className="bg-slate-700 border-emerald-500 border scale-150" icon={faLocationCrosshairs} />
            <FontAwesomeIcon className="bg-slate-700 border-emerald-500 border scale-150" icon={faWrench} />
          </div>
      </div>
  )
};
