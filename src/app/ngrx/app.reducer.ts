import { AuthState, CrypterState } from './reducers';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer, crypterReducer } from './reducers';

export interface AppState {
    auth: AuthState,
    crypter: CrypterState
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    crypter: crypterReducer
}