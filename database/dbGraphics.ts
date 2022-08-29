import { Seguimiento } from '../models'
import { ISeguimiento } from '../interface'

import { db } from '.'

export const getFollowByMachineId = async (id: string): Promise<ISeguimiento[] | []> => {
    await db.connect()

    const followsByMachine = await Seguimiento.find({ maquina_id_relacion: id })
        .select(
            ' -id_seguimiento -imgDeVerificacion -comentario -estadoDeLaMaquina -nombreDeObservador -maquina_id_relacion -__v',
        )
        .lean()

    await db.disconnect()

    if (!followsByMachine) {
        return []
    }

    //con esto forzamos al objeto a que sea serealizado como un string
    return followsByMachine
}
