import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { OTsContext, UIContext } from '../../context'
import { IOT } from '../../interface'
import { managementApi } from '../../services'
import { yupValidations } from '../../utils'

export const useOTs = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalOTs, toggleModalWarringDeleted } =
        useContext(UIContext)
    const {
        dataOTs,
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
    const [idxIdRelationMaq, setIdxIdRelationMaq] = useState<Array<{ _id: string; id_maquina: number }>>([])
    const [idxIdRelationRep, setIdxIdRelationRep] = useState<
        Array<{
            _id: string
            nombre: string
            existencia: number
        }>
    >([])
    const [idxUsersMttos, setIdxUsersMttos] = useState<Array<{ nombre: string; rol: string }>>([])
    const handlerIndexOfIdMaq = async () => {
        await managementApi
            .get('/admin/inventorysMaq')
            .then(({ data }) => {
                setIdxIdRelationMaq(data)
            })
            .catch((err) => console.log(err))
    }

    const handlerIndexOfIdRep = async () => {
        await managementApi
            .get('/admin/inventorysRep')
            .then(({ data }) => {
                setIdxIdRelationRep(data)
            })
            .catch((err) => console.log(err))
    }

    const handlerIndexOfUsersMttos = async () => {
        await managementApi
            .get('/admin/usersMttos')
            .then(({ data }) => {
                setIdxUsersMttos(data)
            })
            .catch((err) => console.log(err))
    }

    //console.log({ inventory })
    useEffect(() => {
        if (dataOTs) {
            handlerIndexOfIdMaq()
            handlerIndexOfIdRep()
            handlerIndexOfUsersMttos()
        }
    }, [dataOTs])

    useEffect(() => {
        changeIsLoading()
        getOTsData()
        changeIsLoading()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formMethodsCreate = useForm<IOT>({
        resolver: yupResolver(yupValidations.validationCreateOT),
    })

    const formMethodsUpdate = useForm<IOT>({
        resolver: yupResolver(yupValidations.validationUpdateOT),
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
            console.log('actualizando:', data)
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
        idxIdRelationMaq,
        idxIdRelationRep,
        idxUsersMttos,
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
