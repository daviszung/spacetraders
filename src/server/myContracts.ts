const options = {
	headers: {
		"content-type": "application/json",
		Authorization: "Bearer " + process.env.TOKEN,
	},
};

async function getMyContracts() {
	try {
		const details = await fetch(
			"https://api.spacetraders.io/v2/my/contracts",
			options
		);

		const detailsBody = await details.json();

		console.log(detailsBody);
	} catch (err) {
		console.log("error: ", err);
	}

	return;
}

async function acceptContract(contractID: string) {
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
	} catch (err) {
		console.log("error: ", err);
	}

	return;
}

acceptContract("clkszds1dm3iws60cvcun8a6l");