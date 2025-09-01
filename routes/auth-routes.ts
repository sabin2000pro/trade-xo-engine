import { Router } from "express";
import {
  registerUserAsync,
  loginUserAsync,
} from "../controllers/auth-controllers";

const authRouter = Router();

authRouter.route("/auth/register").post(registerUserAsync);
authRouter.route('/auth/login').post(loginUserAsync);