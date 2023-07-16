import { MachineContract } from '@costcalculation/machine-contract';
import ContractCard from '../components/contract-card';
import { useRecoilState } from 'recoil';
import { contractsState } from '../data/contracts';
import { AddContractCard } from '../components/add-contract-card';
import {
  deleteContract,
  fetchContracts,
  postContract,
  updateContract,
} from '../data/fetch-logic';
import {
  errorNotification,
  successNotification,
} from '../components/notification';

export function Contracts() {
  const [contracts, setContracts] = useRecoilState(contractsState);

  async function sync() {
    const data = await fetchContracts();
    if (!data) return;
    setContracts(data);
  }

  async function deleteContractHandler(contract: MachineContract) {
    const isDeleted = await deleteContract(contract);
    if (isDeleted) {
      await sync();
      successNotification('Deletion of contract completed successfully!');
    } else {
      errorNotification('Something went wrong. Please try again!');
    }
  }

  async function submitContract(contract: MachineContract) {
    const result = await postContract(contract);
    if (result) {
      await sync();
      successNotification('Creation of contract completed successfully!');
    } else {
      errorNotification('Something went wrong. Please try again!');
    }
  }

  async function editContractHandler(contract: MachineContract) {
    const result = await updateContract(contract);
    if (result) {
      await sync();
      successNotification('Update of contract completed successfully!');
    } else {
      errorNotification('Something went wrong. Please try again!');
    }
  }

  return (
    <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center gap-4">
      <div className="col-span-1 flex justify-center">
        <AddContractCard
          handleSubmitFunction={(contract: MachineContract) =>
            submitContract(contract)
          }
        />
      </div>
      {contracts.map((c) => (
        <ContractCard
          key={c._id}
          contract={c}
          deleteHandler={() => deleteContractHandler(c)}
          editHandler={(contract: MachineContract) =>
            editContractHandler(contract)
          }
        />
      ))}
    </div>
  );
}

export default Contracts;
