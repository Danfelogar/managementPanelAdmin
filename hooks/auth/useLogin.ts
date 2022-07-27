import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { validateLogin } from '../../utils/validations/validateLogin'

export interface FormData {
    email: string
    contrasena: string
}

export const useLogin = () => {
    const [showPassword, setshowPassword] = useState(false)
    const [showError, setShowError] = useState(false)

    const formsMethods = useForm<FormData>({
        resolver: yupResolver(validateLogin),
    })

    const handleOnChangeShowPassword = () => {
        setshowPassword(!showPassword)
    }

    const onLoginUser = async ({ email, contrasena }: FormData) => {
        setShowError(false)
        //los probiders que recibe esta funcion son todos los que le halla pasado yo por [...nextauth].ts, mando primero el tag que quiero dirigirme en este caso es 'credentials'
        await signIn('credentials', { email, contrasena })
    }

    return {
        //states
        showPassword,
        showError,

        //methods
        formsMethods,

        //funtions
        handleOnChangeShowPassword,
        onLoginUser,
    }
}
