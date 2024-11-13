import { Request, Response } from "express";
import { createNewUser, userLogin } from "../services/authService";

export const login = async(req: Request, res: Response) => {
    try {
        const user = await userLogin(req.body);
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json((error as Error).message)
    }
}

export const register = async(req: Request, res: Response) => {
    try {
        const newUser = await createNewUser(req.body);
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json((error as Error).message)
    }
}
