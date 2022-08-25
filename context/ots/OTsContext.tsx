import { createContext } from 'react'

import { IOT } from '../../interface'
interface ContextProps {
    //state
    msmTextDelete: string
    msmTextUpdate: string
    isLoading: boolean
    dataOTs: IOT[] | []
    isUpdateOT: Boolean
    oTForUpdate: IOT | undefined

    //functions
    getOTsData: (searchParamsReq?: string) => Promise<IOT[]>
    changeIsLoading: () => void
    changeIsUpdateOT: (val: boolean) => void
    changeOTForUpdate: (singleOT: IOT) => void
    changeMsmTextDelete: (email: string) => void
    changeMsmTextUpdate: (_id: string) => void
    //TODO:
    handleCreateOT: (data: IOT) => void
    handleUpdateOT: (data: Partial<IOT>) => void
    handleDeleteOT: (_id: string) => void
}

export const OTsContext = createContext({} as ContextProps)
