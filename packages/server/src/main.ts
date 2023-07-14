import express from 'express';
import { connectDB, initializeContracts, getContracts, postContract } from './DbConnect'
import { MachineContract } from '@costcalculation/machine-contract';

const app = express();

async function startServer() {
  const db = await connectDB('mongodb://db:27017');
  await initializeContracts(db);

  app.get('/', async (req, res) => {
    const contracts = await getContracts(db);
    res.json(contracts);
  });

  app.post('/', async (req, res) => {
    const contract: MachineContract = req.body;
    const newContract = await postContract(db, contract);
    res.json(newContract);
  });


  app.listen(3000, () => console.log('Server running on port 3000'));
}

startServer();
