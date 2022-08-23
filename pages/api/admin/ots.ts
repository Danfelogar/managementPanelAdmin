import type { NextApiRequest, NextApiResponse } from 'next'

import { IOT } from '../../../interface'
import { db } from '../../../database'
import { CounterTable, OT } from '../../../models'
type Data = { message: string } | IOT[] | IOT | Partial<IOT[]>

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getOTs(req, res)
        case 'POST':
            return createOT(req, res)
        case 'PUT':
            return updateOT(req, res)
        case 'DELETE':
            return deleteOT(req, res)
        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}
const getOTs = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    return res.status(201).json({ message: 'OTs created successfully' })
}

const createOT = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    return res.status(201).json({ message: 'OTs created successfully' })
}

const updateOT = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    return res.status(201).json({ message: 'OTs created successfully' })
}

const deleteOT = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    return res.status(201).json({ message: 'OTs created successfully' })
}
