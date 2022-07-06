import { MongoClient, ObjectId } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGO_URI); 
let db;
mongoClient.connect().then(() => {
  db = mongoClient.db("banco_de_dados_narutinStore");
});

const objectId= ObjectId

export {db,objectId}