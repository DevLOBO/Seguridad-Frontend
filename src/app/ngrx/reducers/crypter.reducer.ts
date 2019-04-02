import { CryptInfo } from '../../models/crypt-info';
import { Error } from '../../models/error';
import { CrypterTypes, CrypterActions } from '../actions/crypter.actions';

export interface CrypterState {
    crypt?: CryptInfo,
    error?: Error,
    loading?: boolean,
    ok: boolean
}

const initialStae: CrypterState = { loading: false, ok: false };

export function crypterReducer(state: CrypterState = initialStae, action: CrypterTypes): CrypterState {
    switch(action.type) {
        case CrypterActions.DECRYPT:
            return {
                ...state,
                loading: true
            };
        case CrypterActions.DECRYPT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                ok: false
            };
        case CrypterActions.DECRYPT_SUCCESS:
            return {
                ...state,
                loading: false,
                ok: true,
                crypt: action.decrypted
            };
        case CrypterActions.ENCRYPT:
            return {
                ...state,
                loading: true
            };
        case CrypterActions.ENCRYPT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                ok: false
            };
        case CrypterActions.ENCRYPT_SUCCESS:
            return {
                ...state,
                crypt: action.encrypted,
                loading: false,
                ok: true
            };
        default:
            return state;
    }
}