import { useContext, useState } from 'react'

import { UIContext } from '../../context'

export const useOTs = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalUsers } = useContext(UIContext)
    const [msmTextDelete, setMsmTextDelete] = useState('')

    const handleUpdateOT = () => {
        toggleModalUsers()
        toggleSnackBarSuccess()
    }

    const handleDeletedOT = (ot_id: string) => {
        setMsmTextDelete(ot_id)
        toggleSnackBarError()
    }

    return {
        //states
        msmTextDelete,
        //methods
        //functions
        handleUpdateOT,
        handleDeletedOT,
    }
}
