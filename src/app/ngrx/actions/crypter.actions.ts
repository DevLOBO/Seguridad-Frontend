import { Action } from '@ngrx/store';
import { CryptInfo } from '../../models/crypt-info';
import { Error } from '../../models/error';

export enum CrypterActions {
    ENCRYPT = '[Crypter] Encrypt',
    ENCRYPT_SUCCESS = '[Crypter] Encrypt Success',
    ENCRYPT_FAILED = '[Crypter] Encrypt Failed',
    DECRYPT = '[Crypter] Decrypt',
    DECRYPT_SUCCESS = '[Crypter] Decrypt Success',
    DECRYPT_FAILED = '[Crypter] Decrypt Failed'
}

export class EncryptAction implements Action {
    readonly type = CrypterActions.ENCRYPT;

    constructor(public encrypt: CryptInfo) { }
}

export class EncryptSuccessAction implements Action {
    readonly type = CrypterActions.ENCRYPT_SUCCESS;

    constructor(public encrypted: CryptInfo) { }
}

export class EncryptFailedAction implements Action {
    readonly type = CrypterActions.ENCRYPT_FAILED;

    constructor(public error: Error) { }
}

export class DecryptAction implements Action {
    readonly type = CrypterActions.DECRYPT;

    constructor(public decrypt: CryptInfo) { }
}

export class DecryptSuccessAction implements Action {
    readonly type = CrypterActions.DECRYPT_SUCCESS;

    constructor(public decrypted: CryptInfo) { }
}

export class DecryptFailedActions implements Action {
    readonly type = CrypterActions.DECRYPT_FAILED;

    constructor(public error: Error) { }
}

export type CrypterTypes = EncryptAction |
                           EncryptFailedAction |
                           EncryptSuccessAction |
                           DecryptAction |
                           DecryptFailedActions |
                           DecryptSuccessAction;