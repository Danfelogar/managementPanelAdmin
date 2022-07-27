import mongoose, { model, Model, Schema } from 'mongoose'

import { ISeguimiento } from '../interface'

const seguimientoSchema = new Schema(
    {
        id_seguimiento: { type: String, required: true, unique: true },
        imgDeVerificacion: [{ type: String, required: true }],

        comentario: { type: String, required: true },
        estadoDeLaMaquina: { type: String, required: true },
        nombreDeObservador: { type: String, required: true },

        tiempoDeFuncionamiento: { type: Number, required: true },
        tiempoDeReparacion: { type: Number, required: true },

        maquina_id_relacion: [{ type: String, required: true }],
    },
    {
        timestamps: true,
    },
)

const Seguimiento: Model<ISeguimiento> = mongoose.models.Seguimiento || model('Seguimiento', seguimientoSchema)

export default Seguimiento
