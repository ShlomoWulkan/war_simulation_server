import { Router } from "express";
import { addAttack, getAllAttacksOfDefense, getAllAttacksOfOrg } from "../controllers/attackController";

const router = Router();

router.post("/org", getAllAttacksOfOrg);

router.post("/defense", getAllAttacksOfDefense);

router.post("/add", addAttack);

export default router
