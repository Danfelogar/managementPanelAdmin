import mongoose, { model, Model, Schema } from 'mongoose'

interface ICounterTable {
    idInventarioMaq: String
    seqMaq: Number
    idInventarioRep: String
    seqRep: Number
    idOT: String
    seqOT: Number
    idSeg: String
    seqSeg: Number
}

const counterTableSchema = new Schema({
    idInventarioMaq: { type: String, unique: false },
    seqMaq: { type: Number, unique: false },
    idInventarioRep: { type: String, unique: false },
    seqRep: { type: Number, unique: false },
    idOT: { type: String, unique: false },
    seqOT: { type: Number, unique: false },
    idSeg: { type: String, unique: false },
    seqSeg: { type: Number, unique: false },
})

const CounterTable: Model<ICounterTable> = mongoose.models.CounterTable || model('CounterTable', counterTableSchema)

export default CounterTable
