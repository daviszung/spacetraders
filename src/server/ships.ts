
export async function getShips() {
	try {
		const response = await fetch("https://api.spacetraders.io/v2/my/ships", {
			headers: {
				"content-type": "application/json",
				Authorization: "Bearer " + process.env.TOKEN,
			},
		});

		const body: {data: any[]} = await response.json();
        const data = body.data;

		console.log(data);

        return data;

	} catch (err) {
		console.log("error: ", err);
	}
	return;
}