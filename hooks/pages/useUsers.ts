import { useContext, useState } from 'react'

import { UIContext } from '../../context'

export const useUsers = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalUsers } = useContext(UIContext)
    const [msmTextDelete, setMsmTextDelete] = useState('')

    const handleUpdateUser = () => {
        toggleModalUsers()
        toggleSnackBarSuccess()
    }

    const handleDeletedUser = (email: string) => {
        setMsmTextDelete(email)
        toggleSnackBarError()
    }

    return {
        //states
        msmTextDelete,
        //methods
        //functions
        handleUpdateUser,
        handleDeletedUser,
    }
}
