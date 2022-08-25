import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { OTsContext, UIContext } from '../../context'
import { IOT } from '../../interface'
import { yupValidations } from '../../utils'

export const useOTs = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalOTs, toggleModalWarringDeleted } =
        useContext(UIContext)
    const {
        oTForUpdate,
        isUpdateOT,
        getOTsData,
        changeMsmTextDelete,
        changeMsmTextUpdate,
        changeIsUpdateOT,
        changeIsLoading,
        changeOTForUpdate,
        handleCreateOT,
        handleUpdateOT,
        handleDeleteOT,
    } = useContext(OTsContext)
    const [idForDelete, setIdForDelete] = useState('')

    useEffect(() => {
        changeIsLoading()
        getOTsData()
        changeIsLoading()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formMethodsCreate = useForm<IOT>({
        resolver: yupResolver(yupValidations.validationCreateUser),
    })

    const formMethodsUpdate = useForm<IOT>({
        resolver: yupResolver(yupValidations.validationUpdateUser),
    })

    const changeModalCreate = () => {
        changeIsUpdateOT(false)
        toggleModalOTs()
    }

    const changeModalUpdate = (singleOT: IOT) => {
        changeIsUpdateOT(true)
        changeOTForUpdate(singleOT)
        toggleModalOTs()
    }

    useEffect(() => {
        if (oTForUpdate?._id) {
            formMethodsCreate.reset()
            formMethodsUpdate.reset({ ...oTForUpdate })
        }

        return () => {
            formMethodsUpdate.reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oTForUpdate])

    const handleCreateOrUpdateOT = (data: IOT) => {
        if (isUpdateOT) {
            changeMsmTextUpdate(data._id)
            //TODO: hacer funcionalidad correspondiente al clg
            changeIsLoading()
            handleUpdateOT(data)
            changeIsLoading()
            //console.log('actualizando:', data)
        } else {
            changeMsmTextUpdate('')
            //TODO: hacer funcionalidad correspondiente al clg
            changeIsLoading()
            handleCreateOT(data)
            changeIsLoading()
            // console.log('creando', data)
        }
        toggleModalOTs()
        toggleSnackBarSuccess()
    }

    const warningDeletedOT = (ot_id: string, _id: string) => {
        setIdForDelete(_id)
        changeMsmTextDelete(ot_id)
        toggleModalWarringDeleted()
    }

    const handleDeletedOT = () => {
        changeIsLoading()
        handleDeleteOT(idForDelete)
        changeIsLoading()
        toggleModalWarringDeleted()
        toggleSnackBarError()
    }

    return {
        //states
        //methods
        formMethodsCreate,
        formMethodsUpdate,
        //functions
        changeModalCreate,
        changeModalUpdate,
        handleCreateOrUpdateOT,
        handleDeletedOT,
        warningDeletedOT,
    }
}
