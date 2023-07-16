import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { AddContractCard } from './add-contract-card';
import { CardWrapper } from './card-wrapper';
import { DeleteContractDialog } from './delete-contract-dialog';
import { DialogWrapper } from './dialog-wrapper';
import { useState } from 'react';
import { MachineContract } from '@costcalculation/machine-contract';

export interface ContractCardProps {
  contract: MachineContract;
  deleteHandler: () => void;
  editHandler: (c: MachineContract) => Promise<void>;
}

export default function ContractCard({
  contract,
  deleteHandler,
  editHandler,
}: ContractCardProps) {
  const { machineName, oneTimeFee, usageFee } = contract;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteHandler();
    setShowDeleteDialog(false);
  };

  const handleDismissDelete = () => {
    setShowDeleteDialog(false);
  };

  return (
    <CardWrapper>
      <h1 className="text-lg font-bold text-center">{machineName}</h1>
      <h2 className="text-center">
        <span className="font-semibold text-center">One Time Fee:</span>{' '}
        {oneTimeFee}
      </h2>
      <h2 className="text-center">
        <span className="font-semibold">Usage Fee:</span> {usageFee}
      </h2>
      <div className="flex flex-col w-full px-12 space-y-2 justify-center !mt-4 font-semibold">
        <button
          className="flex flex-row basis-1/2 items-center justify-center bg-blue-500 text-white rounded-lg py-2 px-1 gap-2 text-sm"
          onClick={() => setShowEditDialog(true)}
        >
          <BsPencilFill />
          <span>Edit</span>
        </button>
        <button
          className="grow flex flex-row basis-1/2 items-center justify-center bg-red-500 text-white rounded-lg py-2 px-1 gap-2 text-sm"
          onClick={handleDelete} // Hier direkt die Funktion übergeben
        >
          <BsTrashFill />
          <span>Delete</span>
        </button>
      </div>
      {showDeleteDialog && (
        <DeleteContractDialog
          machineName={machineName}
          handleConfirmDelete={handleConfirmDelete} // Hier direkt die Funktion übergeben
          handleDismissDelete={handleDismissDelete} // Hier direkt die Funktion übergeben
        />
      )}
      {showEditDialog && (
        <DialogWrapper>
          <div className="w-fit h-fit bg-white rounded-xl relative pt-2">
            <div
              className="absolute top-2 right-3 w-fit h-fit font-bold rounded-full"
              onClick={() => setShowEditDialog(false)}
            >
              X
            </div>
            <AddContractCard
              machineContract={contract}
              handleSubmitFunction={(c: MachineContract) => {
                editHandler(c);
                setShowEditDialog(false);
              }}
            />
          </div>
        </DialogWrapper>
      )}
    </CardWrapper>
  );
}
