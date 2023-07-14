import { MachineContract } from "@costcalculation/machine-contract";
import { useEffect, useState } from "react";
import ContractCard from "../components/contract-card";
import { useRecoilState } from "recoil";
import { contractsState } from "../atoms/contracts";

const url = 'http://localhost:3000/'
async function fetchContracts(){
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json()
        return data as MachineContract[]
      } else {
        throw new Error('Error while fetching data');
      }
    } catch (error) {
      console.error(error);
    } 
  };

  async function deleteContract({_id}: MachineContract) {
    try {
      const response = await fetch(`url/${_id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Contract deletion failed');
      }
  
      console.log('Contract deleted successfully');
      return true
    } catch (error) {
      console.error(error);
    }
  }

export function Contracts() {

    const [contracts, setContracts] = useRecoilState(contractsState)
    const updateContracts = async () => {
        const data = await fetchContracts()
        if(!data) return
        setContracts(data)
    }

    useEffect(() => {
        updateContracts()
      }, []);

      async function deleteContract(contract: MachineContract){
        console.table(contract)
      }
 
    return (
    <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-4">
         {contracts.map(c => (
    <ContractCard key={c._id} contract={c} deleteHandler={() => deleteContract(c)} />
   

  ))}
  <div className="col-span-1 flex justify-center">
    <div className="w-60 h-72 px-6 bg-white rounded-xl p-3 space-y-2 text-gray-700 shadow-xl">
    <h1 className="font-bold text-lg text-center">Add a Contract</h1>
    <form className="text-center flex-col justify-center">
  <label className="font-semibold"  >Machine Name:</label>
  <input className="mb-2 text-center border-gray-300 border rounded-sm" type="text" id="machine-name" name="machine-name" required/>

  <label className="font-semibold" >One Time Fee:</label>
  <input className="mb-2 text-center border-gray-300 border rounded-sm" type="number" step="1" id="one-time-fee" name="one-time-fee" required/>

  <label className="font-semibold">Usage Fee:</label>
  <input className="mb-2 text-center border-gray-300 border rounded-sm" type="number" step="1" id="usage-fee" name="usage-fee"  required/>

    <div className="w-full flex justify-center mt-2">
    <input className="bg-lime-400 font-semibold hover:bg-lime-300 active:bg-lime-200 rounded-lg px-4 py-2 self-center" type="submit" value="Submit"/>
    </div>
            
</form>
        
    </div>
  </div>
   
  </div>
    
    );
  }
  
  export default Contracts;