import { db, objectId } from "../db/mongo.js";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const userSchema = joi.object({
    name: joi
      .string()
      .pattern(/^[a-zA-Z\s]*$/)
      .required(), // Only accepts upper or lower case letters or blank spaces
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  
export async function registerUser(req, res) {
    let { email, name, password } = req.body;
    const { error } = userSchema.validate(req.body);
  
    const encryptedPassword = bcrypt.hashSync(password, 10);
  
    if (error) {
      res.sendStatus(422);
      return;
    }
    try {
      const alreadyExists = await db
        .collection("users")
        .find({ email: email })
        .toArray();
      if (alreadyExists.length === 0) {
        await db
          .collection("users")
          .insertOne({ ...req.body, password: encryptedPassword });
        res.sendStatus(201);
      } else {
        res.sendStatus(409);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
export   async function loginUser(req, res) {
    let { email, password } = req.body;
    const userSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });
    const { error } = userSchema.validate(req.body);
  
    if (error) {
      res.sendStatus(422);
      return;
    }
    try {
      const loginData = await db.collection("users").findOne({ email: email });
      const verifyPassword = bcrypt.compareSync(password, loginData.password);
      if (loginData.length !== 0) {
        if (email == loginData.email && verifyPassword) {
          const token = uuid();
          await db.collection("sessions").insertOne({
            token,
            userId: loginData._id,
          });
          res.status(200).send({ token });
        } else {
          res.status(401).send("E-mail ou senha inválidos!");
        }
      } else {
        res.status(401).send("E-mail ou senha inválidos!");
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
export   async function postsUser(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
  
    // Verify if the token is valid
    const session = await db.collection("sessions").findOne({ token });
  
    if (!session) {
      return res.status(404).send("Token inválido");
    }
  
    const activeUser = await db
      .collection("users")
      .findOne({ _id: new objectId(session.userId) });
    console.log(activeUser);
  
    res.send(activeUser);
  }