import { UIState } from './UIProvider'

type UIActionType = { type: '[UI] Change theme'; payload: 'light' | 'dark' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case '[UI] Change theme':
            return {
                ...state,
                theme: action.payload,
            }
        default:
            return state
    }
}
