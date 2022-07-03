import { MongoClient, ObjectId } from "mongodb";

const mongoClient = new MongoClient("mongodb://localhost:27017");
let db;
mongoClient.connect().then(() => {
  db = mongoClient.db("banco_de_dados_wallet");
});

const objectId= ObjectId

export {db,objectId}