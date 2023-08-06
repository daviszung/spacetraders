import { useState, useEffect } from "react";

type Route = {
    departure: {
        symbol: string,
        type: string,
        systemSymbol: string,
        x: number,
        y: number;
    },
    destination: {
        symbol: string,
        type: string,
        systemSymbol: string,
        x: number,
        y: number;
    },
    status: string,
    flightMode: "CRUISE" | "BURN" | "DRIFT" | "STEALTH";
};

type Crew = {
    current: number,
    capacity: number,
    required: number,
    rotation: string,
    morale: number,
    wages: number;
};

type Fuel = {
    current: number,
    capacity: number,
    consumed: {
        amount: number,
        timestamp: string;
    };
};


type Frame = {
    symbol: string,
    name: string,
    description: string,
    moduleSlots: number,
    mountingPoints: number,
    fuelCapacity: number,
    condition: number,
    requirements: {
        power: number,
        crew: number;
    };
};


type Reactor = {
    symbol: string,
    name: string,
    description: string,
    condition: number,
    powerOutput: number,
    requirements: {
        crew: number;
    };
};


type Engine = {
    symbol: string,
    name: string,
    description: string,
    condition: number,
    speed: number,
    requirements: {
        power: number,
        crew: number;
    };
};

type Module = {
    symbol: string,
    name: string,
    description: string,
    capacity: number,
    requirements: {
        crew: number,
        power: number,
        slots: number;
    };
};

type Mount = {
    symbol: string,
    name: string,
    description: string,
    strength: number,
    deposits: string[],
    requirements: {
        crew: number,
        power: number;
    };
};

type Registration = {
    name: string;
    factionSymbol: string;
    role: string;
}

type Cargo = {
    capacity: number;
    units: number;
    inventory: string[]
}

type Ship = {
    symbol: string,
    nav: {
        systemSymbol: string,
        waypointSymbol: string,
        route: Route;
    };
    crew: Crew;
    fuel: Fuel;
    frame: Frame;
    reactor: Reactor;
    engine: Engine;
    modules: Module[];
    mounts: Mount[];
    registration: Registration
    cargo: Cargo
};

export function ShipsDashboard() {
    const [ships, setShips] = useState<Ship[]>();

    useEffect(() => {
        fetch('/ships', {
            headers: {
                "content-type": "application/json",
            }
        })
            .then(res => res.json())
            .then(res => setShips(res as Ship[]))
            .catch(err => console.log(err));

    }, []);
    return (
        <div>
          <div className="font-bold text-2xl text-amber-400 my-4">SHIPS</div>
          {ships && ships.map((ship, index) => (
            <div>
                <div>{ship.registration.name}</div>
                <div>{ship.registration.role}</div>
            </div>
          ))}

        </div>
    );
};
