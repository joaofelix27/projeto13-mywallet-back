import { Router } from "express";
import {postsUser} from '../controllers/postController.js'
import validateUser from "../middlewares/validateUserMiddleware.js";


const router = Router ()

router.get("/posts", validateUser, postsUser);

export default router;