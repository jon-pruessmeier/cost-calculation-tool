import { MachineContract } from "@costcalculation/machine-contract";
export interface ContractCardProps{
    contract: MachineContract
    deleteHandler: () => void
}

export default function ContractCard({contract, deleteHandler}: ContractCardProps){
    const {machineName, oneTimeFee, usageFee} = contract
    return (
    <div className="w-60 h-72 bg-white rounded-xl p-3 space-y-2 text-gray-700 shadow-xl" onClick={() => deleteHandler()}>
        <h1 className="text-lg font-bold text-center">{machineName}</h1>
        <h2><span className="font-semibold">One Time Fee:</span> {oneTimeFee}</h2>
        <h2><span className="font-semibold">Usage Fee:</span> {usageFee}</h2>
    </div>
    )

}