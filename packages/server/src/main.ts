import express from 'express';
import { connectDB, initializeContracts } from './DbService';
import { createContractsRouter } from './contractsRouter';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

const PORT = 8080;

async function startServer() {
  const db = await connectDB('mongodb://db:27017');
  await initializeContracts(db);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  const contractsRouter = createContractsRouter(db);
  app.use('/contracts', contractsRouter);

  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

startServer();
