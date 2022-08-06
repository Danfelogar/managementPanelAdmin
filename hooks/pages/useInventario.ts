import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import { UIContext } from '../../context'
import { IInd } from '../../interface'

const dataTest = [
    {
        frecuencia_de_reparacion: 100,
        frecuencia_de_falla: 4,
        porcentaje_de_disponibilidad: 45,
    },
    {
        frecuencia_de_reparacion: 12,
        frecuencia_de_falla: 6,
        porcentaje_de_disponibilidad: 23,
    },
    {
        frecuencia_de_reparacion: 12,
        frecuencia_de_falla: 7,
        porcentaje_de_disponibilidad: 20,
    },
    {
        frecuencia_de_reparacion: 34,
        frecuencia_de_falla: 8,
        porcentaje_de_disponibilidad: 16,
    },
    {
        frecuencia_de_reparacion: 54,
        frecuencia_de_falla: 2,
        porcentaje_de_disponibilidad: 70,
    },
    {
        frecuencia_de_reparacion: 56,
        frecuencia_de_falla: 23,
        porcentaje_de_disponibilidad: 20,
    },
    {
        frecuencia_de_reparacion: 58,
        frecuencia_de_falla: 5,
        porcentaje_de_disponibilidad: 24,
    },
    {
        frecuencia_de_reparacion: 70,
        frecuencia_de_falla: 6,
        porcentaje_de_disponibilidad: 70,
    },
    {
        frecuencia_de_reparacion: 16,
        frecuencia_de_falla: 7,
        porcentaje_de_disponibilidad: 40,
    },
    {
        frecuencia_de_reparacion: 45,
        frecuencia_de_falla: 8,
        porcentaje_de_disponibilidad: 39,
    },
    {
        frecuencia_de_reparacion: 43,
        frecuencia_de_falla: 9,
        porcentaje_de_disponibilidad: 32,
    },
    {
        frecuencia_de_reparacion: 65,
        frecuencia_de_falla: 3,
        porcentaje_de_disponibilidad: 20,
    },
]

export const useInventario = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalWarringDeleted } = useContext(UIContext)

    const [msmTextDelete, setMsmTextDelete] = useState('')
    const [dataBar, setDataBar] = useState<IInd[] | []>([])

    const { push } = useRouter()

    const navigateToUpate = (url: string) => {
        push(url)
    }

    useEffect(() => {
        setDataBar(dataTest)
    }, [])

    const handleUpdateInventario = () => {
        toggleSnackBarSuccess()
    }

    const warningDeletedInventario = (id: string) => {
        setMsmTextDelete(id)
        toggleModalWarringDeleted()
    }

    const handleDeletedInventario = () => {
        toggleModalWarringDeleted()
        toggleSnackBarError()
    }

    return {
        //states
        msmTextDelete,
        dataBar,
        //methods
        //functions
        navigateToUpate,
        handleUpdateInventario,
        handleDeletedInventario,
        warningDeletedInventario,
    }
}
