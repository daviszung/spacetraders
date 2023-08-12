import { Waypoint } from "../server/navigation";


type WaypointProps = {
    waypoint: Waypoint

}

const typeColors: {[index: string]: string} = {
    "PLANET": "blue-500",
    "GAS_GIANT": "rose-700",
    "MOON": "slate-100",
    "ORBITAL_STATION": "emerald-300",
    "JUMP_GATE": "violet-400",
    "ASTEROID_FIELD": "yellow-800"
}


export function Waypoint({waypoint}: WaypointProps) {

    return (
        <div className={`shadow-${typeColors[waypoint.type]} flex items-center rounded bg-slate-800 text-emerald-100 p-6 shadow`}>
            <div className="flex">
                <ul className="font-semibold text-lg gap-2 mr-8">
                    <li>SYMBOL</li>
                    <li>TYPE</li>
                    <li>TRAITS</li>
                </ul>
                <ul className="font-semibold text-lg gap-2 italic text-emerald-600">
                    <li>{waypoint.symbol}</li>
                    <li className={`text-${typeColors[waypoint.type]}`}>{waypoint.type}</li>
                    {waypoint.traits.map((trait, index) => {
                        if (trait.symbol === "MARKETPLACE") {
                            return (
                                <li className="cursor-pointer text-amber-300">MARKETPLACE</li>
                            )
                        } else if (trait.symbol === "SHIPYARD") {
                            return (
                                <li className=" cursor-pointer text-sky-500">SHIPYARD</li>
                            )
                        }
                        return (
                            <li key={index}>{trait.symbol}</li>
                        );
                    })}
                </ul>
            </div>

        </div>
        
    );
};
