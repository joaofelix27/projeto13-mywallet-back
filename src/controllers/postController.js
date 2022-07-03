import { db, objectId } from "../db/mongo.js";

export   async function postsUser(req, res) {
    const session = res.locals.session
  
    const activeUser = await db
      .collection("users")
      .findOne({ _id: new objectId(session.userId) });
    console.log(activeUser);
  
    res.send(activeUser);
  }