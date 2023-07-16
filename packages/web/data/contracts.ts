import { MachineContract } from '@costcalculation/machine-contract';
import { atom } from 'recoil';

export const contractsState = atom({
  key: 'contracts',
  default: Array<MachineContract>(),
});
