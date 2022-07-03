import express from "express";
import cors from "cors";
import { registerUser, loginUser, postsUser } from "./controllers/userController.js";

const app = express();
app.use(express.json(),cors());

// Routes

app.post("/cadastro", registerUser);

app.post("/login", loginUser);

app.get("/posts", postsUser);


app.listen(5000);
