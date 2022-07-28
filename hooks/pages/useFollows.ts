import { useContext, useState } from 'react'

import { UIContext } from '../../context'

export const useFollows = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalFollows } = useContext(UIContext)
    const [msmTextDelete, setMsmTextDelete] = useState('')

    const handleUpdateFollow = () => {
        toggleModalFollows()
        toggleSnackBarSuccess()
    }

    const handleDeletedFollow = (id: string) => {
        setMsmTextDelete(id)
        toggleSnackBarError()
    }

    return {
        //states
        msmTextDelete,
        //methods
        //functions
        handleUpdateFollow,
        handleDeletedFollow,
    }
}
