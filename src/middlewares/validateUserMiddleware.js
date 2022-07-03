import { db, objectId } from "../db/mongo.js";

async function validateUser(req, res, next) {
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

  if (!activeUser) {
    return res.sendStatus(401);
  }
  delete activeUser.password;
  res.locals.activeUser = activeUser;

  next();
}

export default validateUser;
