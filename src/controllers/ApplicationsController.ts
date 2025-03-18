import { Request, Response } from "express"
import ApplicationsModel from "../model/ApplicationsModel"

// método que busca todos
export const getAll = async (req: Request, res: Response) => {
    const users = await ApplicationsModel.findAll()
    res.send(users)
}