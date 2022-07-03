import { Router } from "express";
import {postsUser} from '../controllers/postController.js'

const router = Router ()

router.get("/posts", postsUser);

export default router;