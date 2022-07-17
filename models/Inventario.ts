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
        },
        nombre: { type: String, required: true },
        imgQR: { type: String, required: true },
        estado: {
            type: String,
            enum: {
                values: ['bueno', 'malo', 'regular'],
                message: '{VALUE} no es un estado valido',
                default: 'regular',
                required: true,
            },
        },
        imagenes: [{ type: String, required: true }],
        fechaDeEntrada: { type: String, required: true },
        fechaDeActualizacion: { type: String, required: true },
        //maquina condicional
        id_maquina: { type: String, unique: true },
        capacidadNominal: { type: String },
        serie: { type: String },
        marca: { type: String },
        voltaje: { type: Number },
        corriente: { type: Number },
        observacionGeneral: { type: String },
        ind: {
            frecuencia_de_reparacion: { type: Number },
            frecuencia_de_falla: { type: Number },
            porcentaje_de_disponibilidad: { type: Number },
        },
        locacion: {
            type: String,
            enum: {
                values: ['produccion', 'taller', 'bodega', 'oficina_administrativa'],
                message: '{VALUE} no es una locacion permitida',
                default: 'bodega',
                required: true,
            },
        },
        subLocacion: { type: Number },
        //repuesto condicional
        id_repuesto: { type: String, unique: true },
        existencia: { type: Number },
        coordenadas_gps: { type: String },
        maquina_id_relacion: [{ type: String, unique: true }],
    },
    {
        timestamps: true,
    },
)

const Inventario: Model<IInventario> = mongoose.models.Inventario || model('Inventario', inventarioSchema)

export default Inventario
