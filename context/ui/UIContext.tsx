import { createContext } from 'react'

interface ContextProps {
    //state
    theme: 'light' | 'dark'
    isMenuOpen: boolean
    isModalUsersOpen: boolean
    isModalFollowsOpen: boolean
    isModalOTsOpen: boolean
    isSnackbarSuccess: boolean
    isSnackbarError: boolean

    //funtions
    changeTheme: (theme: 'light' | 'dark') => void
    toggleSideMenu: () => void
    toggleModalUsers: () => void
    toggleModalFollows: () => void
    toggleModalOTs: () => void
    toggleSnackBarSuccess: () => void
    toggleSnackBarError: () => void
}

export const UIContext = createContext({} as ContextProps)
