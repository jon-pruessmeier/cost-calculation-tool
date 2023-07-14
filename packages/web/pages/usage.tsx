import { useRecoilState } from "recoil"
import { contractsState } from "../atoms/contracts"

export function Usage(){
    const [contracts, setContracts] = useRecoilState(contractsState)
    return (
    <div className="w-full h-full flex justify-center pt-20">
       <div className="w-full mx-12 h-96 bg-white shadow-xl rounded-xl grid grid-cols-3 pt-8">
        <div className="col-span-1 flex flex-col items-center">
            <h1>Usage:</h1>
            <input className="mb-2 text-center border-gray-300 border rounded-sm" type="number" step="1" id="one-time-fee" name="one-time-fee" required/>
        </div>
        <div className="col-span-1 flex flex-col items-center">
            <h1>Usage:</h1>
            <input className="mb-2 text-center border-gray-300 border rounded-sm" type="number" step="1" id="one-time-fee" name="one-time-fee" required/>
        </div>
        <div className="col-span-1 flex flex-col items-center">
            <h1>Usage:</h1>
            <input className="mb-2 text-center border-gray-300 border rounded-sm" type="number" step="1" id="one-time-fee" name="one-time-fee" required/>
        </div>

       </div>
    </div>
    )
}

export default Usage;