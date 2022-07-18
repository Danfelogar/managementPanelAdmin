import { FC, ReactNode, useEffect, useReducer } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { UIContext, uiReducer } from './'

export interface UIState {
    theme: 'light' | 'dark'
}

const UI_INITIAL_STATE: UIState = {
    theme: 'light',
}

interface Props {
    children: ReactNode
}

export const UIProvider: FC<Props> = ({ children }) => {
    const router = useRouter()
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const changeTheme = (theme: 'light' | 'dark') => {
        Cookies.set('theme', theme)
        dispatch({ type: '[UI] Change theme', payload: theme })
    }

    useEffect(() => {
        const themeByCookies = Cookies.get('theme')! as 'light' | 'dark'

        dispatch({ type: '[UI] Change theme', payload: themeByCookies !== undefined ? themeByCookies : 'light' })
    }, [])

    return (
        <UIContext.Provider
            value={{
                ...state,

                //funtions
                changeTheme,
            }}
        >
            {children}
        </UIContext.Provider>
    )
}
