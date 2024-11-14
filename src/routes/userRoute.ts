import { Router } from "express";
import { getOneUser } from "../controllers/usersController";
import verifyUser from "../middlewares/verifyUser";


const router = Router();

router.get("/:id", verifyUser, getOneUser) 

export default router
