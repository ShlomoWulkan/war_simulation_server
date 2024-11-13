import { Request, Response } from "express";
import { createAttack, getAttacksOfOrg, getAttacksOfDefense } from "../services/attacksService";

export const getAllAttacksOfOrg = async(req: Request, res: Response) => {
    try {
        const attacks = await getAttacksOfOrg(req.body);
        res.status(200).json(attacks)
    } catch (error) {
        res.status(400).json((error as Error).message)
    }
}

export const getAllAttacksOfDefense = async(req: Request, res: Response) => {
    try {
        const attacks = await getAttacksOfDefense(req.body);
        res.status(200).json(attacks)
    } catch (error) {
        res.status(400).json((error as Error).message)
    }
}

export const addAttack = async(req: Request, res: Response) => {
    try {
        const attack = await createAttack(req.body);
        res.status(200).json(attack)
    } catch (error) {
        res.status(400).json((error as Error).message)
    }
};

