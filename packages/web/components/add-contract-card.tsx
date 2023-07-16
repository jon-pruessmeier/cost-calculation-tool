import { useEffect, useState } from 'react';
import { CardWrapper } from './card-wrapper';
import { MachineContract } from '@costcalculation/machine-contract';

export function AddContractCard({
  machineContract,
  handleSubmitFunction,
}: {
  machineContract?: MachineContract;
  handleSubmitFunction?: (contract: MachineContract) => unknown;
}) {
  const [machineName, setMachineName] = useState(
    machineContract?.machineName || ''
  );
  const [oneTimeFee, setOneTimeFee] = useState(
    (machineContract?.oneTimeFee || 0).toString()
  );
  const [usageFee, setUsageFee] = useState(
    (machineContract?.usageFee || 0).toString()
  );

  function setNumber(val: string) {
    const number = parseInt(val);
    return isNaN(number) ? '0' : number.toString();
  }

  const handleSubmit = (event: React.FormEvent) => {
    //No Reload of page:
    event.preventDefault();

    // Generate the MachineContract object
    const newMachineContract: MachineContract = {
      _id: machineContract?._id ?? '',
      machineName: machineName,
      oneTimeFee: parseInt(oneTimeFee) || 0,
      usageFee: parseInt(usageFee) || 0,
    };
    if (handleSubmitFunction) {
      handleSubmitFunction(newMachineContract);
    }

    // Reset the form inputs
    setMachineName('');
    setOneTimeFee('0');
    setUsageFee('0');
  };

  return (
    <CardWrapper>
      <h1 className="font-bold text-lg text-center mt-6">
        {machineContract ? 'Edit your contract' : 'Add a Contract'}
      </h1>
      <form
        className="text-center flex flex-col justify-center"
        onSubmit={handleSubmit}
      >
        <label className="font-semibold">Machine Name:</label>
        <input
          className="mb-2 text-center border-gray-300 border rounded-sm"
          type="text"
          id="machine-name"
          name="machine-name"
          required
          value={machineName}
          onChange={(event) => setMachineName(event.target.value)}
        />

        <label className="font-semibold">One Time Fee:</label>
        <input
          className="mb-2 text-center border-gray-300 border rounded-sm"
          type="number"
          min="0"
          step="1"
          id="one-time-fee"
          name="one-time-fee"
          value={oneTimeFee}
          onChange={(event) => setOneTimeFee(setNumber(event.target.value))}
          required
        />

        <label className="font-semibold">Usage Fee:</label>
        <input
          className="mb-2 text-center border-gray-300 border rounded-sm"
          type="number"
          min="0"
          step="1"
          id="usage-fee"
          name="usage-fee"
          value={usageFee}
          onChange={(event) => setUsageFee(setNumber(event.target.value))}
          required
        />

        <div className="w-full flex justify-center mt-2">
          <button
            className="bg-lime-400 font-semibold hover:bg-lime-300 active:bg-lime-200 rounded-lg px-4 py-2 self-center"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </CardWrapper>
  );
}
