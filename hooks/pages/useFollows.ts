import { useContext, useState } from 'react'

import { UIContext } from '../../context'

export const useFollows = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalFollows, toggleModalWarringDeleted } =
        useContext(UIContext)
    const [msmTextDelete, setMsmTextDelete] = useState('')

    const handleUpdateFollow = () => {
        toggleModalFollows()
        toggleSnackBarSuccess()
    }

    const warningDeletedFollow = (id: string) => {
        setMsmTextDelete(id)
        toggleModalWarringDeleted()
    }

    const handleDeletedFollow = () => {
        toggleModalWarringDeleted()
        toggleSnackBarError()
    }

    return {
        //states
        msmTextDelete,
        //methods
        //functions
        handleUpdateFollow,
        handleDeletedFollow,
        warningDeletedFollow,
    }
}
