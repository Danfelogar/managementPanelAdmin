import * as yup from 'yup'

export const validateLogin = yup.object().shape({
    email: yup.string().email('Ingrese un email válido.').required('Campo requerido.'),
    contrasena: yup.string().required('Campo requerido.'),
})
