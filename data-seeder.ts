// Data Model Imports
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: "../env" });
import User from "./models/users-model";
//import Wallet from "./models/wallet-model";
//import Transaction from "./models/transaction-model";
//import Order from "./models/orders-model";
//import Deposit from "./models/deposit-model";
import { connectDatabaseAsync } from "./database/conn-db";

const usersFilePath = path.join(__dirname, "data", "users.json");
const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

connectDatabaseAsync();

export const importDevDataAsync = async () => { // Seeds the dev data into the mongodb database collection
  
  try {

      await User.deleteMany();

      await User.insertMany(usersData);

      console.log('User data inserted successfully...')

      return process.exit(1);
  } 
  
  catch (error) {
    if (error) {
      console.log(`Could not insert the data - reason : ${error}`);
    }
  }
};

export const removeDevDataAsync = async () => {

  try {
     await User.deleteMany();
  } 

  catch (error) {
    if(error) {
      console.log('Failed to remove the dev data...')
    }
  }
};

// Handle CLI arguments to load / remove data
if (process.argv[2] === "--import") {
  importDevDataAsync();
}

if (process.argv[2] === "--remove") {
  removeDevDataAsync();
}
