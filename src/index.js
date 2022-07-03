import express from "express";
import cors from "cors";
import postsRouter from "./routes/postsRouter.js";
import authRouter from "./routes/authRouter.js";
import validateUser from "./middlewares/validateUser.js";

const app = express();
app.use(express.json(), cors());

// Routes
app.use(authRouter);
app.use(validateUser, postsRouter);

app.listen(5000);
