import { Router } from "express";
import {postsUser, register, getRegister} from '../controllers/postController.js'
import validateUser from "../middlewares/validateUserMiddleware.js";


const router = Router ()

router.get("/posts", validateUser, postsUser);

router.get("/entrada", validateUser, getRegister);

router.post("/entrada", validateUser, register);

export default router;