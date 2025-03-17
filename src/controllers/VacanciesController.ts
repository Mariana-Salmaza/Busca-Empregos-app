import { Request, Response } from "express"
import VacanciesModel from "../model/VacanciesModel"

// método que busca todos
export const getAll = async (req: Request, res: Response) => {
    const vacancies = await VacanciesModel.findAll()
    res.send(vacancies)
}

// método que busca por id
export const getVacanciesById = async (
    req: Request<{ id: string }>,
    res: Response) => {
        
        const vacancie = await VacanciesModel.findByPk(req.params.id)

        return res.json(vacancie);
    }

// método que cria uma nova vaga
export const createVacancie = async (req: Request, res: Response) => {

    try {
        const { name } = req.body

        if (!name || name === '') {
            return res.status(400).json({error: 'Name is required'})
        }

        const vacancie = await VacanciesModel.create({ name })
        res.status(201).json(vacancie)
    } catch (error) {
        res.status(500).json('Erro interno no servidor ' + error)
    }
}

// método que atualiza um usuário
export const updateVacancie = async (
    req: Request<{ id: string }>, 
    res: Response) => {

    try {
        const { title } = req.body
        if (!title || title === '') {
            return res.status(400)
                .json({error: 'Name is required'})
        }

        const vacancie = await VacanciesModel.findByPk(req.params.id)
        if (!vacancie) {
            return res.status(404)
                .json({error: 'User not found'})
        }

        vacancie.title = title
        
        await vacancie.save()
        res.status(201).json(vacancie)
    } catch (error) {
        res.status(500).json('Erro interno no servidor ' + error)
    }
    
}

// método que destrói
export const destroyVacancieById = async (
    req: Request<{ id: string }>, 
    res: Response) => {
    
        try {
            const vacancie = await VacanciesModel.findByPk(req.params.id)
            if (!vacancie) {
                return res.status(404)
                    .json({error: 'User not found'})
            }
    
            await vacancie.destroy()
    
            res.status(204).send()
        } catch (error) {
            res.status(500).json('Erro interno no servidor ' + error)
        }
}