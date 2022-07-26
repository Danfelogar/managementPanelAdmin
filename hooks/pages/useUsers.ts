import { useState } from 'react'

export const useUsers = () => {
    //TODO: remember deleted this functions
    const [isModalUserOpen, setIsModalUserOpen] = useState(false)

    const handleChangeModalUser = () => {
        setIsModalUserOpen(!isModalUserOpen)
    }

    return {
        //states
        isModalUserOpen,
        //methods
        //functions
        handleChangeModalUser,
    }
}
