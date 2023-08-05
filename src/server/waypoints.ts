async function getWaypointsInSystem(systemID: string) {
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

type WaypointsList = SystemObject[];

function findTrait(targetTrait: string, waypoints: { data: WaypointsList }) {
	if (!waypoints.data) {
		console.log("Error no waypoint data");
		return;
	}

	const results = [];

	for (let i = 0; i < waypoints.data.length; i++) {
		const traits = waypoints.data[i].traits;

		for (let trait = 0; trait < traits.length; trait++) {
			if (traits[trait]["symbol"] === targetTrait) {
				results.push(waypoints.data[i]);
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
					"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUkFUIiwidmVyc2lvbiI6InYyIiwicmVzZXRfZGF0ZSI6IjIwMjMtMDctMjkiLCJpYXQiOjE2OTA5MzU1NzUsInN1YiI6ImFnZW50LXRva2VuIn0.BYOxPTSni7BofWzLQ98ER_502UJQWOPfeHznWfY2SF_MKnWHjOof6FbTnPAhJfFlpwfNt-9A79G03904r0s2hpGs-pNtMOmPPwkljTnZYdvwjZgoHmHdRS9zKlbPlDLldGFxIJMGWrRArnZbld0xT8VsUYHZuNUp2fPNGLWu-UuTTiOBdEJGsJlQnNZc3S0Zw1FMbowwiJplo8uyMfKuzqivB0cXdvOpDNsgUqI-VrTTStJDwrk3ONNn2PymBTOmmK44hVN0D4l78-OpSajNIvfnXyqD_jg8oZeCv1dIisFsuZBpkyoAg0myhEqxp1t45JaB9Ahj_YwPeDgi_IRczA",
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
	const waypoints = (await getWaypointsInSystem("X1-AB85")) as {
		data: WaypointsList;
	};
	const result = findTrait("SHIPYARD", waypoints);

	const availableShips = await viewAvailableShips("X1-AB85", "X1-AB85-54087X")


	purchaseMiningDrone("X1-AB85-54087X")

}


main();
