import { useContext, useState } from 'react'

import { UIContext } from '../../context'

export const useUsers = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalUsers, toggleModalWarringDeleted } =
        useContext(UIContext)
    const [msmTextDelete, setMsmTextDelete] = useState('')

    const handleUpdateUser = () => {
        toggleModalUsers()
        toggleSnackBarSuccess()
    }

    const warringDeletedUser = (email: string) => {
        setMsmTextDelete(email)
        toggleModalWarringDeleted()
    }

    const handleDeletedUser = () => {
        toggleModalWarringDeleted()
        toggleSnackBarError()
    }

    return {
        //states
        msmTextDelete,
        //methods
        //functions
        handleUpdateUser,
        handleDeletedUser,
        warringDeletedUser,
    }
}
