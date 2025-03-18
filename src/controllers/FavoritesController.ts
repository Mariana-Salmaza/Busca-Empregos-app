import { Request, Response } from "express"
import FavoritesModel from "../model/FavoritesModel"
import ApplicationsModel from "../model/ApplicationsModel"

// método que busca todos
export const getAll = async (req: Request, res: Response) => {
    const users = await ApplicationsModel.findAll()
    res.send(users)
}