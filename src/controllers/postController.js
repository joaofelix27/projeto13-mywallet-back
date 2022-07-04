import { db, objectId } from "../db/mongo.js";
import dayjs from "dayjs";

export async function postsUser(req, res) {
  const activeUser = res.locals.activeUser;

  res.send(activeUser);
}

export async function register(req, res) {
  const activeUser = res.locals.activeUser;
  let now = dayjs()
  let { value, description, type } = req.body;
  try {
    const newValue= (Math.round(value * 100) / 100).toFixed(2)
    await db.collection("register").insertOne({
      value: newValue,
      description,
      type,
      userId:  activeUser._id,
      time: now.format('DD-MM')
    });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function getRegister(req, res) {
  const activeUser = res.locals.activeUser;
  try {
    const usersRegister= await db.collection("register").find({
      userId:  activeUser._id,
    }).toArray();
    res.status(200).send(usersRegister);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
