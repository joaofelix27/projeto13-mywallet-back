import { db} from "../db/mongo.js";

async function validateUser (req,res,next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
  
    // Verify if the token is valid
    const session = await db.collection("sessions").findOne({ token });
  
    if (!session) {
      return res.status(404).send("Token inválido");
    }
    res.locals.session = session

    next ()
}

export default validateUser