import { useSession } from 'next-auth/react'

export const useGraphics = () => {
    const { data, status } = useSession()

    return {
        //states
        data,
        status,
        //methods
        //functions
    }
}
