import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { InventoriesContext, UIContext } from '../../context'
import { IInd, IInventario } from '../../interface'
import { yupValidations } from '../../utils'

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

export const useInventory = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalWarringDeleted } = useContext(UIContext)
    const {
        isUpdateInventory,
        getInventoriesData,
        changeMsmTextDelete,
        changeMsmTextUpdate,
        changeIsLoading,
        changeIsUpdateInventory,
        handleCreateInventory,
        handleUpdateInventory,
        handleDeleteInventory,
    } = useContext(InventoriesContext)
    const [idForDelete, setIdForDelete] = useState('')
    const [dataBar, setDataBar] = useState<IInd[] | []>([])

    const { push } = useRouter()

    useEffect(() => {
        changeIsLoading()
        getInventoriesData()
        changeIsLoading()
    }, [])

    const formMethodsCreate = useForm<IInventario>({
        resolver: yupResolver(yupValidations.validateLogin),
    })

    const formMethodsUpdate = useForm<IInventario>({
        resolver: yupResolver(yupValidations.validationUpdateInventory),
    })

    const navigateToUpdate = (url: string) => {
        push(url)
    }

    useEffect(() => {
        setDataBar(dataTest)
    }, [])

    const handleCreateOrUpdateInventory = (data: IInventario) => {
        if (isUpdateInventory) {
            changeMsmTextUpdate(data._id)
            //TODO: hacer funcionalidad correspondiente al clg
            changeIsLoading()
            handleUpdateInventory(data)
            changeIsLoading()
            console.log('actualizando:', data)
        } else {
            changeMsmTextUpdate('')
            //TODO: hacer funcionalidad correspondiente al clg
            changeIsLoading()
            handleCreateInventory(data)
            changeIsLoading()
            // console.log('creando', data)
        }
        toggleSnackBarSuccess()
    }

    const handleUpdateInventario = () => {
        toggleSnackBarSuccess()
    }

    const warningDeletedInventario = (nombre: string, _id: string) => {
        setIdForDelete(_id)
        changeMsmTextDelete(nombre)
        toggleModalWarringDeleted()
    }

    const handleDeletedInventario = () => {
        changeIsLoading()
        handleDeleteInventory(idForDelete)
        changeIsLoading()
        toggleModalWarringDeleted()
        toggleSnackBarError()
    }

    return {
        //states
        dataBar,
        //methods
        //functions
        navigateToUpdate,
        handleCreateOrUpdateInventory,
        handleUpdateInventario,
        handleDeletedInventario,
        warningDeletedInventario,
    }
}
