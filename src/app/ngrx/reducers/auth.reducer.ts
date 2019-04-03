import { AuthTypes, AuthActions } from '../actions/auth.actions';
export interface AuthState {
    authenticated?: boolean,
    loading?: boolean,
    locked?: boolean,
    token?: string,
    username?: string,
    expiration?: Date,
    roles?: string[],
    error?: string
}

const initialState: AuthState = {
    authenticated: false,
    loading: false,
    locked: false
}

export function authReducer(state: AuthState = initialState, action: AuthTypes): AuthState {
    switch(action.type) {
        case AuthActions.AUTHENTICATE:
            return {
                ...state,
                loading: true
            };
        case AuthActions.AUTHENTICATE_FAILED:
            return {
                ...state,
                loading: false,
                authenticated: false,
                error: action.error
            };
        case AuthActions.AUTHENTICATE_SUCCESS:
            return {
                ...state,
                loading: false,
                authenticated: action.infoUser.logged,
                username: action.infoUser.username,
                token: action.infoUser.token,
                roles: action.infoUser.roles,
                expiration: action.infoUser.expiration
            };
        case AuthActions.LOGOUT:
            return { ...state };
        case AuthActions.LOGOUT_SUCCESS:
            return initialState;
        case AuthActions.LOCK:
            return { ...state, locked: true };
        case AuthActions.UNLOCK:
            return { ...state, loading: true };
        case AuthActions.UNLOCK_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case AuthActions.UNLOCK_SUCCESS:
            return {
                ...state,
                locked: false,
                expiration: action.date,
                loading: false
            };
        default:
            return state;
    }
}