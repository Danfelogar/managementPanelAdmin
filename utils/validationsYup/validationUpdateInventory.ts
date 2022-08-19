import moment, { isDate } from 'moment'
import * as yup from 'yup'

import { checkIfValidlatitudeAndlongitude } from '../validations'

// function parseDateString(value, originalValue) {
//     const parsedDate = isDate(originalValue) ? originalValue : moment(originalValue).format('DD/MM/YYYY')

//     return parsedDate
// }

export const validationUpdateInventory = yup.object().shape({
    tipoInventario: yup
        .string()
        .required('Campo requerido.')
        .oneOf(['maquina', 'repuesto'], 'Debe de escoger entre estas opciones'),
    nombre: yup.string().required('Campo requerido.').min(3, 'Debe de colocar un nombre con mas de 2 caracteres'),
    estado: yup
        .string()
        .required('Campo requerido.')
        .oneOf(['bueno', 'malo', 'regular'], 'Debe de escoger entre estas opciones'),
    fechaDeEntrada: yup
        .date()
        .required('Campo requerido.')
        .transform(function (value, originalValue) {
            const parsedDate = isDate(originalValue) ? originalValue : moment(originalValue).format('DD/MM/YYYY')

            return parsedDate
        })
        .max(new Date()),
    fechaDeActualizacion: yup
        .date()
        .required('Campo requerido.')
        .transform(function (value, originalValue) {
            const parsedDate = isDate(originalValue) ? originalValue : moment(originalValue).format('DD/MM/YYYY')

            return parsedDate
        })
        .max(new Date()),
    imagenes: yup
        .array()
        .required('Campo requerido')
        .min(1, 'mínimo 1 imágenes por inventario')
        .max(3, 'máximo 3 imágenes por inventario'),

    //si es una maquina validar los siguientes campos
    capacidadNominal: yup.string().when('capacidadNominal', (val, schema) => {
        if (val) {
            if (val.length > 0) {
                //si existe el campo y es mayor a cero su length aplicar la siguiente validación
                return yup
                    .string()
                    .required('Campo requerido.')
                    .min(1, 'Debe de colocar una capacidad nominal con al menos 1 carácter')
            } else {
                return yup.string().notRequired()
            }
        } else {
            return yup.string().notRequired()
        }
    }),
    serie: yup.string().when('serie', (val, schema) => {
        if (val) {
            if (val.length > 0) {
                //si existe el campo y es mayor a cero su length aplicar la siguiente validación
                return yup
                    .string()
                    .required('Campo requerido.')
                    .min(3, 'Debe de colocar un serial con mas de 2 caracteres')
            } else {
                return yup.string().notRequired()
            }
        } else {
            return yup.string().notRequired()
        }
    }),
    marca: yup.string().when('marca', (val, schema) => {
        if (val) {
            if (val.length > 0) {
                //si existe el campo y es mayor a cero su length aplicar la siguiente validación
                return yup
                    .string()
                    .required('Campo requerido.')
                    .min(3, 'Debe de colocar una marca con mas de 2 caracteres')
            } else {
                return yup.string().notRequired()
            }
        } else {
            return yup.string().notRequired()
        }
    }),
    voltaje: yup.number().when('voltaje', (val, schema) => {
        if (val) {
            if (val.length > 0) {
                //si existe el campo y es mayor a cero su length aplicar la siguiente validación
                return yup
                    .number()
                    .required('Campo requerido.')
                    .positive()
                    .min(1, 'El voltaje tiene que ser un número y no puede ser negativo')
            } else {
                return yup.number().notRequired()
            }
        } else {
            return yup.number().notRequired()
        }
    }),
    corriente: yup.number().when('corriente', (val, schema) => {
        if (val) {
            if (val.length > 0) {
                //si existe el campo y es mayor a cero su length aplicar la siguiente validación
                return yup
                    .number()
                    .required('Campo requerido.')
                    .positive()
                    .min(1, 'La corriente tiene que ser un número y no puede ser negativo')
            } else {
                return yup.number().notRequired()
            }
        } else {
            return yup.number().notRequired()
        }
    }),
    observacionGeneral: yup.string().when('observacionGeneral', (val, schema) => {
        if (val) {
            if (val.length > 0) {
                //si existe el campo y es mayor a cero su length aplicar la siguiente validación
                return yup
                    .string()
                    .required('Campo requerido.')
                    .min(3, 'Los comentarios generales deben tener más de 2 caracteres')
            } else {
                return yup.string().notRequired()
            }
        } else {
            return yup.string().notRequired()
        }
    }),
    locacion: yup.string().when('locacion', (val, schema) => {
        if (val) {
            if (val.length > 0) {
                //si existe el campo y es mayor a cero su length aplicar la siguiente validación
                return yup
                    .string()
                    .required('Campo requerido.')
                    .oneOf(
                        ['produccion', 'taller', 'bodega', 'oficina_administrativa'],
                        'Debe de escoger entre estas opciones',
                    )
            } else {
                return yup.string().notRequired()
            }
        } else {
            return yup.string().notRequired()
        }
    }),
    subLocacion: yup.number().when('subLocacion', (val, schema) => {
        if (val) {
            if (val.length > 0) {
                //si existe el campo y es mayor a cero su length aplicar la siguiente validación
                return yup
                    .number()
                    .required('Campo requerido.')
                    .positive()
                    .min(1, 'La subLocacion tiene que ser un número y no puede ser negativo')
            } else {
                return yup.number().notRequired()
            }
        } else {
            return yup.number().notRequired()
        }
    }),

    //si es un repuesto validar los siguientes campos
    existencia: yup.number().when('existencia', (val, schema) => {
        if (val) {
            if (val.length > 0) {
                //si existe el campo y es mayor a cero su length aplicar la siguiente validación
                return yup
                    .number()
                    .required('Campo requerido.')
                    .positive()
                    .min(0, 'Las existencia tiene que ser un número y no puede ser negativo')
            } else {
                return yup.number().notRequired()
            }
        } else {
            return yup.number().notRequired()
        }
    }),
    coordenadas_gps: yup.string().when('coordenadas_gps', (val, schema) => {
        if (val) {
            if (val.length > 0) {
                //si existe el campo y es mayor a cero su length aplicar la siguiente validación
                return yup.string().required('Campo requerido.').transform(checkIfValidlatitudeAndlongitude)
            } else {
                return yup.string().notRequired()
            }
        } else {
            return yup.string().notRequired()
        }
    }),
    maquina_id_relacion: yup.string().when('maquina_id_relacion', (val, schema) => {
        if (val) {
            if (val.length > 0) {
                //si existe el campo y es mayor a cero su length aplicar la siguiente validación
                return yup.array().required('Campo requerido').min(1, 'mínimo 1 imágenes por inventario')
            } else {
                return yup.string().notRequired()
            }
        } else {
            return yup.string().notRequired()
        }
    }),
})
