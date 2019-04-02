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
        default:
            return state;
    }
}