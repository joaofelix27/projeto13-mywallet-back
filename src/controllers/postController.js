import { db, objectId } from "../db/mongo.js";

export async function postsUser(req, res) {
  const activeUser = res.locals.activeUser;

  res.send(activeUser);
}

export async function register(req, res) {
  const activeUser = res.locals.activeUser;
  let { value, description, type } = req.body;
  try {
    await db.collection("register").insertOne({
      value,
      description,
      type,
      _id:  new objectId(activeUser._id)
    });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  res.send(activeUser);
}
