import { Router } from "express";
import {postsUser, register} from '../controllers/postController.js'
import validateUser from "../middlewares/validateUserMiddleware.js";


const router = Router ()

router.get("/posts", validateUser, postsUser);

router.post("/entrada", validateUser, register);

export default router;