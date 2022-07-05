import express from "express";
import cors from "cors";
import postsRouter from "./routes/postsRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();
app.use(express.json(), cors());

// Routes
app.use(authRouter);
app.use(postsRouter);

// app.listen(5000);
app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});

//https://mywallet27.herokuapp.com/