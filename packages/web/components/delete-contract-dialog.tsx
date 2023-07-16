import { DialogWrapper } from './dialog-wrapper';

interface DeleteContractDialogProps {
  machineName: string;
  handleConfirmDelete: (val?: unknown) => unknown;
  handleDismissDelete: (val?: unknown) => unknown;
}

export function DeleteContractDialog({
  machineName,
  handleConfirmDelete,
  handleDismissDelete,
}: DeleteContractDialogProps) {
  return (
    <DialogWrapper>
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-center">
          Are you sure you want to delete {machineName}?
        </h2>
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-xl"
            onClick={handleDismissDelete}
          >
            Dismiss
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
            onClick={handleConfirmDelete}
          >
            OK
          </button>
        </div>
      </div>
    </DialogWrapper>
  );
}
