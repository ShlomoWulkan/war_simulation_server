import { Router } from "express";
import { addAttack, getAllAttacksOfDefense, getAllAttacksOfOrg } from "../controllers/attackController";
import verifyUser from "../middlewares/verifyUser";
const router = Router();

router.get("/org/:id", verifyUser, getAllAttacksOfOrg);

router.post("/defense/:area", verifyUser, getAllAttacksOfDefense);

router.post("/add", verifyUser, addAttack);

export default router
