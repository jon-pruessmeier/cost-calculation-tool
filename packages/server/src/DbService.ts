import { MachineContract } from '@costcalculation/machine-contract';
import { Collection, Db, MongoClient, ObjectId } from 'mongodb';

export async function connectDB(uri: string): Promise<Db> {
  const client = new MongoClient(uri);

  return client.db('machineContractsDB');
}

// set up demo data
export async function initializeContracts(db: Db): Promise<void> {
  const contractsCollection: Collection<MachineContract> =
    db.collection('contracts');

  const contract1: MachineContract = {
    _id: new ObjectId().toHexString(),
    machineName: 'Demo Machine 1',
    oneTimeFee: 1000,
    usageFee: 200,
  };

  const contract2: MachineContract = {
    _id: new ObjectId().toHexString(),
    machineName: 'Demo Machine 2',
    oneTimeFee: 1500,
    usageFee: 250,
  };

  //delete possible data from DB
  const result = await contractsCollection.deleteMany({});
  console.log(`${result.deletedCount} documents deleted.`);

  const existingContract1 = await contractsCollection.findOne({
    _id: 'contract1',
  });
  if (!existingContract1) {
    await contractsCollection.insertOne(contract1);
  }

  const existingContract2 = await contractsCollection.findOne({
    _id: 'contract2',
  });
  if (!existingContract2) {
    await contractsCollection.insertOne(contract2);
  }
}

export async function getContracts(db: Db): Promise<MachineContract[]> {
  return db.collection<MachineContract>('contracts').find().toArray();
}

export async function postContract(
  db: Db,
  contract: MachineContract
): Promise<MachineContract> {
  const contractsCollection: Collection<MachineContract> =
    db.collection('contracts');

  if (!contract) {
    throw new Error('Contract is undefined');
  }

  const newContract: MachineContract = {
    ...contract,
    _id: new ObjectId().toHexString(),
  };

  await contractsCollection.insertOne(newContract);
  return contract;
}

export async function deleteContract(db: Db, id: string): Promise<boolean> {
  const contractsCollection: Collection<MachineContract> =
    db.collection('contracts');
  try {
    const deleteResult = await contractsCollection.deleteOne({ _id: id });
    return deleteResult.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting contract:', error);
  }
}

export async function updateContract(
  db: Db,
  id: string,
  updatedContract: Partial<MachineContract>
): Promise<boolean> {
  const contractsCollection: Collection<MachineContract> =
    db.collection('contracts');

  try {
    const updateResult = await contractsCollection.updateOne(
      { _id: id },
      { $set: updatedContract }
    );
    return updateResult.matchedCount > 0;
  } catch (error) {
    console.error('Error updating contract:', error);
    return false;
  }
}
