import { MachineContract } from "@costcalculation/machine-contract";
import { Collection, Db, MongoClient, ObjectId } from "mongodb";

const url =  "mongodb://localhost:27017"


export async function connectDB(uri: string): Promise<Db> {
  
  const client = new MongoClient(uri);
  for (let i = 0; i < 30; i++){
    try{
       await client.connect();
       break;
    } catch{
      
    }
    
  }
 
  return client.db('machineContractsDB');
}

export async function initializeContracts(db: Db): Promise<void> {
  const contractsCollection: Collection<MachineContract> = db.collection('contracts');
  
  const contract1: MachineContract = {
    _id: 'contract1',
    machineName: 'Machine 1',
    oneTimeFee: 1000,
    usageFee: 200,
  };

  const contract2: MachineContract = {
    _id: 'contract2',
    machineName: 'Machine 2',
    oneTimeFee: 1500,
    usageFee: 250,
  };

  const existingContract1 = await contractsCollection.findOne({_id: 'contract1'});
  if (!existingContract1) {
    await contractsCollection.insertOne(contract1);
  }

  const existingContract2 = await contractsCollection.findOne({_id: 'contract2'});
  if (!existingContract2) {
    await contractsCollection.insertOne(contract2);
  }
}

export async function getContracts(db: Db): Promise<MachineContract[]> {
  return db.collection<MachineContract>('contracts').find().toArray();
}

export async function postContract(db: Db, contract: MachineContract): Promise<MachineContract> {
  const contractsCollection: Collection<MachineContract> = db.collection('contracts');

  if (!contract) {
    throw new Error('Contract is undefined');
  }
  
  if (!contract._id) {
    contract._id = new ObjectId().toString();
  }

  await contractsCollection.insertOne(contract);
  return contract;
}

