import { Request, Response } from "express";
import userModel from "../models/userModel";

export const getOneUser = async(req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json((error as Error).message)
    }
}