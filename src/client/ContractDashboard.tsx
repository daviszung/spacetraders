import { useState, useEffect } from "react"
import { Contract } from "./Contract";
import { DataList } from "./DataList";

export type Contract = {
    id: string
    factionSymbol: string
    type: string
    terms: {[index: string]: any}
    accepted: boolean
    fulfilled: boolean
    expiration: string
    deadlineToAccept: string
}

type ContractsData = {
    data: Contract[]
    meta: {
        total: number
        page: number
        limit: number
    }
}

export function ContractDashboard(){
    const [contracts, setContracts] = useState<ContractsData>()

    const metaLabels = ["TOTAL", "PAGE", "LIMIT"];

    useEffect(() => {
        fetch('/contracts', {
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => setContracts(res as ContractsData))
        .catch(err => console.log(err))
    }, [])
  
  return (
      <div>
          <div className="font-bold text-2xl text-amber-400 my-4">META DATA</div>
          {contracts &&
              <DataList labels={metaLabels} data={[contracts.meta.total, contracts.meta.page, contracts.meta.limit]} />

          }
          <div className="font-bold text-2xl text-amber-400 my-4">CONTRACTS</div>
          {contracts?.data.map((contract, index) =>
              <Contract contract={contract} key={index}></Contract>
          )}

      </div>
  )
};
