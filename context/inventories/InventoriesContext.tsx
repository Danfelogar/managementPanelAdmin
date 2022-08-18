import { createContext } from 'react'

import { IInventario } from '../../interface'

interface ContextProps {
    //state
    msmTextDelete: string
    msmTextUpdate: string
    isLoading: boolean
    dataInventories: IInventario[] | []
    isUpdateInventory: Boolean
    // inventoryForUpdate: IInventario | undefined

    //functions
    getInventoriesData: (searchParamsReq?: string) => Promise<IInventario[]>
    changeIsLoading: () => void
    changeIsUpdateInventory: (val: boolean) => void
    // changeInventoryForUpdate: (singleInventory: IInventario) => void
    changeMsmTextDelete: (email: string) => void
    changeMsmTextUpdate: (_id: string) => void
    //TODO:
    handleCreateInventory: (data: IInventario) => void
    handleUpdateInventory: (data: Partial<IInventario>) => void
    handleDeleteInventory: (_id: string) => void
}

export const InventoriesContext = createContext({} as ContextProps)
