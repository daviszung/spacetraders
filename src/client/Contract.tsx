import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Contract } from "./ContractDashboard";
import { AgentDetails } from "./AgentDashboard";
import { faHandshake, faList } from "@fortawesome/free-solid-svg-icons";
import { PostRequestBody } from "../server/server";

type ContractProps = {
    contract: Contract;

};

type SuccessfulAccept = {
    data: {
        agent: AgentDetails;
        contract: Contract;
    };
};

type FailMessage = {
    error: {
        message: string;
        code: number;
        data: any;
    };
};

function timeUntilTime(deadline: string) {
    const currentTime = new Date();

    const dateDeadline = new Date(deadline);

    const timeDifference = dateDeadline.getTime() - currentTime.getTime();

    const millisecondsInSecond = 1000;
    const millisecondsInMinute = 60 * millisecondsInSecond;
    const millisecondsInHour = 60 * millisecondsInMinute;
    const millisecondsInDay = 24 * millisecondsInHour;

    const days = Math.floor(timeDifference / millisecondsInDay);
    const hours = Math.floor((timeDifference % millisecondsInDay) / millisecondsInHour);
    const minutes = Math.floor((timeDifference % millisecondsInHour) / millisecondsInMinute);

    return `${days}d ${hours}h ${minutes}m`;
}

const mainLabels = ["ID", "FACTION", "TYPE", "ACCEPTED", "STATUS", "EXPIRES"];
const termLabels = ["PAYMENT", "TRADE-SYM", "DESTINATION-SYM", "UNITS", "DEADLINE"];

const acceptedColors = {
    "PENDING": "text-amber-600",
    "ACCEPTED": "text-emerald-600"
};

const statusColors = {
    "INCOMPLETE": "text-amber-600",
    "COMPLETE": "text-emerald-600"
};

export function Contract({ contract }: ContractProps) {
    const [viewTerms, setViewTerms] = useState<boolean>(false);

    const terms = contract.terms;

    const contractStatus = contract.fulfilled ? "COMPLETE" : "INCOMPLETE";
    const acceptedStatus = contract.accepted ? "ACCEPTED" : "PENDING";

    async function acceptContract() {
        try {

            const reqBody: PostRequestBody = {
                target: "/contracts/accept",
                arguments: [contract.id]
            };

            const res = await fetch('/contracts/accept', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(reqBody)
            });

            const body = await res.json();
            console.log(body);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex justify-between border border-emerald-500 rounded bg-slate-800 text-emerald-100 p-6 shadow-md shadow-emerald-900">
            <div>
                <h2 className=" text-amber-300 font-bold text-xl mb-2">{viewTerms ? "TERMS" : "CONTRACT"}</h2>
                {viewTerms ? (
                    <div className="flex">
                        <ul className="font-semibold text-lg gap-2 mr-8">
                            {termLabels.map((label, index) =>
                                <li key={index}>{label.toUpperCase()}</li>
                            )}
                        </ul>
                        <ul className="font-semibold text-lg gap-2 italic text-emerald-600">
                            <li className="text-amber-300">{terms.payment.onAccepted.toLocaleString()} | {terms.payment.onFulfilled.toLocaleString()}</li>
                            <li>{terms.deliver[0].tradeSymbol}</li>
                            <li>{terms.deliver[0].destinationSymbol}</li>
                            <li>{terms.deliver[0].unitsFulfilled} / {terms.deliver[0].unitsRequired}</li>
                            <li className="text-amber-600">{timeUntilTime(terms.deadline)}</li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex">
                        <ul className="font-semibold text-lg gap-2 mr-8">
                            {mainLabels.map((label, index) =>
                                <li key={index}>{label.toUpperCase()}</li>
                            )}
                        </ul>
                        <ul className="font-semibold text-lg gap-2 italic text-emerald-600">
                            <li>{contract.id}</li>
                            <li>{contract.factionSymbol}</li>
                            <li>{contract.type}</li>
                            <li className={`${acceptedColors[acceptedStatus]}`}>{acceptedStatus}</li>
                            <li className={`${statusColors[contractStatus]}`}>{contractStatus}</li>
                            <li className="text-amber-600">{timeUntilTime(contract.expiration)}</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-6">
                <FontAwesomeIcon onClick={() => {
                    if (viewTerms) {
                        setViewTerms(false);
                    } else {
                        setViewTerms(true);
                    }
                }} className="scale-150 cursor-pointer" icon={faList} />
                <FontAwesomeIcon onClick={() => {
                    acceptContract();
                }} className="scale-150 cursor-pointer" icon={faHandshake} />
            </div>
        </div>
    );
};
