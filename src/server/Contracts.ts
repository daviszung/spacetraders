const options = {
	headers: {
		"content-type": "application/json",
		Authorization: "Bearer " + process.env.TOKEN,
	},
};

export async function getMyContracts() {
	try {
		const details = await fetch(
			"https://api.spacetraders.io/v2/my/contracts",
			options
		);

		const detailsBody = await details.json();

		return detailsBody;

	} catch (err) {
		console.log("error: ", err);
	}

	return;
}

export async function acceptContract(contractID: string) {
	try {
		const response = await fetch(
			`https://api.spacetraders.io/v2/my/contracts/${contractID}/accept`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
					Authorization: "Bearer " + process.env.TOKEN,
				},
			}
		);

		const responseBody = await response.json();

		console.log(responseBody);
		return responseBody;
		
	} catch (err) {
		console.log("error: ", err);
	}

	return;
}
