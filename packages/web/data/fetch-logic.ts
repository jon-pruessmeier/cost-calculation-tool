import { MachineContract } from '@costcalculation/machine-contract';

const url = '/api/contracts';

export async function fetchContracts() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data as MachineContract[];
    } else {
      throw new Error('Error while fetching data');
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteContract({ _id }: MachineContract) {
  try {
    const response = await fetch(`${url}/${_id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Contract deletion failed');
    }

    console.log('Contract deleted successfully');
    return true;
  } catch (error) {
    console.error(error);
  }
}

export async function postContract(contract: MachineContract) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contract),
    });

    if (!response.ok) {
      throw new Error('Contract posting failed');
    }

    const data = await response.json();
    console.log('Contract posted successfully:', data);
    return data as MachineContract;
  } catch (error) {
    console.error(error);
  }
}

export async function updateContract(contract: MachineContract) {
  try {
    const response = await fetch(`${url}/${contract._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contract),
    });

    if (response.ok) {
      const text = await response.text();
      console.log('Contract updated successfully:', text);
      return contract;
    } else {
      throw new Error('Contract update failed');
    }
  } catch (error) {
    console.error(error);
  }
}
