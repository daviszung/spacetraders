
export async function getAllSystems() {
	let result;

	const options = {
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + process.env.TOKEN, 
		},
	};

	fetch("https://api.spacetraders.io/v2/systems", options)
		.then((response) => response.json())
		.then((response) => {
			console.log("SYSTEMS", response);
			return response
		})
		.catch((err) => console.error(err));

}

export async function getWaypointsInSystem(systemID: string) {
	try {
		const response = await fetch(
			`https://api.spacetraders.io/v2/systems/${systemID}/waypoints`,
			{
				headers: {
					"content-type": "application/json",
					Authorization: "Bearer " + process.env.TOKEN,
				},
			}
		);

		const responseBody = await response.json();

		return responseBody;
	} catch (err) {
		console.log("error: ", err);
		return;
	}
}

type Trait = {
	symbol: string;
	name: string;
	description: string;
};

type SystemObject = {
	systemSymbol: string;
	symbol: string;
	type: string;
	x: number;
	y: number;
	orbitals: [];
	traits: Trait[];
	chart: { [index: string]: string };
	faction: {
		symbol: string;
	};
};

export type WaypointsList = SystemObject[];

export function findTrait(targetTrait: string, waypoints: WaypointsList) {
	const results = [];

	for (let i = 0; i < waypoints.length; i++) {
		const traits = waypoints[i].traits;

		for (let trait = 0; trait < traits.length; trait++) {
			if (traits[trait]["symbol"] === targetTrait) {
				results.push(waypoints[i]);
			}
		}
	}

	return results;
}

async function viewAvailableShips(systemID: string, shipyardWaypointSymbol: string) {
	try {
		const response = await fetch(
			`https://api.spacetraders.io/v2/systems/${systemID}/waypoints/${shipyardWaypointSymbol}/shipyard`,
			{
				headers: {
					"content-type": "application/json",
					Authorization: "Bearer " + process.env.TOKEN,
				},
			}
		);

		const responseBody = await response.json();

		return responseBody;
	} catch (err) {
		console.log("error: ", err);
		return;
	}
}

type ShipsList = {
	data: {
		symbol: string,
		shipTypes: {type: string}[],
		transactions: {[index: string]: string | number}[],
		ships: {[index: string]: any}[]
	}
}

async function purchaseMiningDrone(shipyardWaypointSymbol: string) {
	try {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer " + process.env.TOKEN
				},
			body: JSON.stringify({
				shipType: "SHIP_MINING_DRONE",
				waypointSymbol: shipyardWaypointSymbol,
			}),
		};
		const response = await fetch(
			`https://api.spacetraders.io/v2/my/ships`,
			options
		);

		const responseBody = await response.json();
		console.log("Mining drone res:", responseBody);

		return responseBody;
	} catch (err) {
		console.log("error: ", err);
		return;
	}
}

async function main() {

	const availableShips = await viewAvailableShips("X1-AB85", "X1-AB85-54087X")


	purchaseMiningDrone("X1-AB85-54087X")

}
