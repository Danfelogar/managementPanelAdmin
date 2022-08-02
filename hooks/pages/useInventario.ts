import { useContext, useState } from 'react'

import { UIContext } from '../../context'

export const useInventario = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalInventario, toggleModalWarringDeleted } = useContext(UIContext)

    const [msmTextDelete, setMsmTextDelete] = useState('')

    const handleUpdateInventario = () => {
        toggleModalInventario()
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
        //methods
        //functions
        handleUpdateInventario,
        handleDeletedInventario,
        warningDeletedInventario,
    }
}
