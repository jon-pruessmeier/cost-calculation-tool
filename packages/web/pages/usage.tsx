import { useRecoilValue } from 'recoil';
import { contractsState } from '../data/contracts';
import { useEffect, useMemo, useState } from 'react';
import { MachineContract } from '@costcalculation/machine-contract';

export function Usage() {
  const contracts = useRecoilValue(contractsState);

  const [selectedContract, setSelectedContract] =
    useState<MachineContract | null>(null);

  const [usage, setUsage] = useState(0);

  const fee = useMemo(() => {
    if (!selectedContract || isNaN(usage)) return '-';
    const { oneTimeFee, usageFee } = selectedContract;
    return oneTimeFee + usageFee * usage;
  }, [usage, selectedContract]);

  const handleUsageChange = (event: any) => {
    setUsage(parseInt(event.target.value));
  };

  const handleContractChange = (event: any) => {
    const selectedContractId = event.target.value as string;
    const contract = contracts.find((c) => c._id === selectedContractId);
    setSelectedContract(contract ?? null);
  };

  return (
    <div className="w-full h-full flex justify-center pt-20">
      <div className="w-full  lg:w-3/4 lg:w-1/2 mx-12 h-96 bg-white shadow-xl rounded-xl pt-8 px-12">
        <h1 className="font-bold text-xl mb-3 text-center">
          Calculate Your Contract Price
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1 flex flex-col items-center">
            <h1>Your usage:</h1>
            <input
              className="mb-2 text-center border-gray-300 border rounded-sm"
              type="number"
              min="0"
              step="1"
              id="usage"
              name="usage"
              value={usage}
              onChange={handleUsageChange}
              required
            />
          </div>
          <div className="col-span-1 flex flex-col items-center">
            <h1>Your machine:</h1>
            <select
              className="mb-2 text-center border-gray-300 border rounded-sm"
              value={selectedContract ? selectedContract._id : ''}
              onChange={handleContractChange}
            >
              <option value="" className="text-left">
                Please choose your machine
              </option>
              {contracts.map((c) => (
                <option className="text-left" value={c._id} key={c._id}>
                  {c.machineName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center mt-12 md:mt-20">
          <h2 className="font-semibold text-lg">Your Contract Price:</h2>
          <h1 className="font-bold text-4xl">{fee} €</h1>
        </div>
      </div>
    </div>
  );
}

export default Usage;
