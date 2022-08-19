import mongoose, { model, Model, Schema } from 'mongoose'

import { IInventario } from '../interface'

const inventarioSchema = new Schema(
    {
        tipoInventario: {
            type: String,
            enum: {
                values: ['maquina', 'repuesto'],
                message: '{VALUE} no es un tip de inventario valido',
                default: 'repuesto',
                required: true,
            },
            default: null,
        },
        nombre: { type: String, required: true, default: '' },
        imgQR: { type: String, required: false, default: '' },
        estado: {
            type: String,
            enum: {
                values: ['bueno', 'malo', 'regular'],
                message: '{VALUE} no es un estado valido',
                default: 'regular',
                required: true,
            },
            default: null,
        },
        imagenes: [{ type: String, required: true }],
        fechaDeEntrada: { type: String, required: true, default: null },
        fechaDeActualizacion: { type: String, required: true, default: null },

        //maquina condicional
        id_maquina: { type: Number, unique: false, required: false, default: 0 },
        capacidadNominal: { type: String, required: false, default: '' },
        serie: { type: String, required: false, default: '' },
        marca: { type: String, required: false, default: '' },
        voltaje: { type: Number, required: false, default: 0 },
        corriente: { type: Number, required: false, default: 0 },
        observacionGeneral: { type: String, required: false, default: '' },
        // ind: [
        //     {
        //         frecuencia_de_reparacion: { type: Number },
        //         frecuencia_de_falla: { type: Number },
        //         porcentaje_de_disponibilidad: { type: Number },
        //     },
        // ],
        locacion: {
            type: String,
            enum: {
                values: ['produccion', 'taller', 'bodega', 'oficina_administrativa'],
                message: '{VALUE} no es una locacion permitida',
                default: 'bodega',
                required: false,
            },
            default: null,
        },
        subLocacion: { type: Number, default: 0 },

        //repuesto condicional
        id_repuesto: { type: Number, unique: false, required: false, default: 0 },
        existencia: { type: Number, required: false, default: 0 },
        coordenadas_gps: { type: String, required: false, default: '' },
        maquina_id_relacion: [{ type: String, required: false, unique: false }],
    },
    {
        timestamps: true,
    },
)

const Inventario: Model<IInventario> = mongoose.models.Inventario || model('Inventario', inventarioSchema)

export default Inventario
