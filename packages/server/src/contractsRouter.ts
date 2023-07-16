import express from 'express';
import {
  deleteContract,
  getContracts,
  postContract,
  updateContract,
} from './DbService';
import { Db } from 'mongodb';
import { MachineContract } from '@costcalculation/machine-contract';

export function createContractsRouter(db: Db) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    console.log('GET REQUEST');
    const contracts = await getContracts(db);
    res.json(contracts);
  });

  router.post('/', async (req, res) => {
    console.log('POST REQUEST');
    if (!req.body) {
      return res.status(400).json({ error: 'Missing request body' });
    }
    const { machineName, oneTimeFee, usageFee } = req.body;
    if (
      !machineName ||
      (!oneTimeFee && oneTimeFee !== 0) ||
      (!usageFee && usageFee !== 0)
    ) {
      return res.status(400).json({
        error: 'Missing required fields',
        machineName: machineName ?? '',
        oneTimeFee: oneTimeFee ?? '',
        usageFee: usageFee ?? '',
      });
    }
    const contract: MachineContract = { machineName, oneTimeFee, usageFee };
    const newContract = await postContract(db, contract);
    res.json(newContract);
  });

  router.delete('/:id', async (req, res) => {
    console.log('DELETE REQUEST');
    const contractId = req.params.id;

    try {
      const deleteSuccess = await deleteContract(db, contractId);

      if (deleteSuccess) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error('Error deleting contract:', error);
      res.sendStatus(500); // Internal Server Error - Serverfehler
    }
  });

  router.put('/:id', async (req, res) => {
    console.log('PUT REQUEST');
    const contractId = req.params.id;
    const updatedContract = req.body;

    try {
      const updateSuccess = await updateContract(
        db,
        contractId,
        updatedContract
      );

      if (updateSuccess) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error('Error updating contract:', error);
      res.sendStatus(500);
    }
  });

  return router;
}
