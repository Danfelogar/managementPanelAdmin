import { createContext } from 'react'

interface ContextProps {
    //state
    theme: 'light' | 'dark'
    isMenuOpen: boolean
    isModalUsersOpen: boolean
    isModalFollowsOpen: boolean

    //funtions
    changeTheme: (theme: 'light' | 'dark') => void
    toggleSideMenu: () => void
    toggleModalUsers: () => void
    toggleModalFollows: () => void
}

export const UIContext = createContext({} as ContextProps)
