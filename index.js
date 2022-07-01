import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import joi from "joi";

const app = express();
app.use(express.json());
app.use(cors());

const userSchema = joi.object({
  name: joi.string().alphanum().required(),
});

const mongoClient = new MongoClient("mongodb://localhost:27017");
let db;
mongoClient.connect().then(() => {
  db = mongoClient.db("banco_de_dados_wallet");
});
app.post("/cadastro", async (req, res) => {
    let { email, name, password } = req.body;
    // const validation = userSchema.validate(req.body, { abortEarly: true });
  
    // if (validation.error) {
    //   res.sendStatus(422);
    //   return;
    // }
    try {
      const alreadyExists = await db
        .collection("users")
        .find({ name: name })
        .toArray();
      console.log(alreadyExists); // if the current name already exists, this variable.lenght is !0
      if (alreadyExists.length === 0) {
        await db.collection("users").insertOne({
          email,
          name,
          password
        });
        res.sendStatus(201);
      } else {
        res.sendStatus(409);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
app.listen(5000);
