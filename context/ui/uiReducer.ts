import { UIState } from './UIProvider'

type UIActionType =
    | { type: '[UI] Change theme'; payload: 'light' | 'dark' }
    | { type: '[UI] Toggle Menu' }
    | { type: '[UI] Toggle Modal Users' }
    | { type: '[UI] Toggle Modal Follows' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case '[UI] Change theme':
            return {
                ...state,
                theme: action.payload,
            }
        case '[UI] Toggle Menu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen,
            }
        case '[UI] Toggle Modal Users':
            return {
                ...state,
                isModalUsersOpen: !state.isModalUsersOpen,
            }
        case '[UI] Toggle Modal Follows':
            return {
                ...state,
                isModalFollowsOpen: !state.isModalFollowsOpen,
            }
        default:
            return state
    }
}
