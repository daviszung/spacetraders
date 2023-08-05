type AgentDetails = {
	accountId: string;
	symbol: string;
	headquarters: string;
	credits: number;
	startingFaction: string;
};

export async function getAgentDetails() {
	try {
		const details = await fetch("https://api.spacetraders.io/v2/my/agent", {
			headers: {
				"content-type": "application/json",
				Authorization: "Bearer " + process.env.TOKEN,
			},
		});

		const detailsBody: { data: AgentDetails } = await details.json();
		const data = detailsBody.data;

		console.log(data);
		
		return data
	} catch (err) {
		console.log("error: ", err);
	}
	return
}
