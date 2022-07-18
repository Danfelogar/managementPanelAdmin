import { createContext } from 'react'

interface ContextProps {
    //state
    theme: 'light' | 'dark'

    //funtions
    changeTheme: (theme: 'light' | 'dark') => void
}

export const UIContext = createContext({} as ContextProps)
