import { MongoClient, ObjectId } from "mongodb";

// const mongoClient = new MongoClient("mongodb://localhost:27017");
const mongoClient = new MongoClient(process.env.MONGO_URI); 
let db;
mongoClient.connect().then(() => {
  db = mongoClient.db("banco_de_dados_wallet");
  // TALVEZ TENHA QUE ALTERAR ISSO process.env.MONGO_DATABASE(cluster0)
});

const objectId= ObjectId

export {db,objectId}