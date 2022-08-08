import { useContext, useState } from 'react'

import { UIContext } from '../../context'

export const useOTs = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalOTs, toggleModalWarringDeleted } =
        useContext(UIContext)
    const [msmTextDelete, setMsmTextDelete] = useState('')

    const handleUpdateOT = () => {
        toggleModalOTs()
        toggleSnackBarSuccess()
    }

    const warningDeletedOT = (ot_id: string) => {
        setMsmTextDelete(ot_id)
        toggleModalWarringDeleted()
    }

    const handleDeletedOT = () => {
        toggleModalWarringDeleted()
        toggleSnackBarError()
    }

    return {
        //states
        msmTextDelete,
        //methods
        //functions
        handleUpdateOT,
        handleDeletedOT,
        warningDeletedOT,
    }
}
