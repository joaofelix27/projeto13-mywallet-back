import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import validateLogin from "../middlewares/loginMiddleware.js";
import validateRegister from "../middlewares/registerMiddleware.js";

const router= Router ()

router.post("/cadastro", validateRegister, registerUser);

router.post("/login", validateLogin,loginUser);

export default router;