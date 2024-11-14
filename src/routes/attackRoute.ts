import { Router } from "express";
import { addAttack, getAllAttacksOfDefense, getAllAttacksOfOrg } from "../controllers/attackController";

const router = Router();

router.get("/org/:id", getAllAttacksOfOrg);

router.post("/defense", getAllAttacksOfDefense);

router.post("/add", addAttack);

export default router
