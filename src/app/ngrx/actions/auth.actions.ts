import { Action } from '@ngrx/store';
import { ResponseLogin } from '../../models/response-login';
import { User } from '../../models/user';

export enum AuthActions {
    AUTHENTICATE = '[Auth] Authenticate',
    AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success',
    AUTHENTICATE_FAILED = '[Auth] Authenticate Failed',
    LOGOUT = '[Auth] Logout',
    LOGOUT_SUCCESS = '[Auth] Logout Success',
    LOCK = '[Auth] Lock',
    UNLOCK = '[Auth] Unlock',
    UNLOCK_SUCCESS = '[Auth] Unlock Success',
    UNLOCK_FAILED = '[Auth] Unlock Failed'
}

export class AuthenticateAction implements Action {
    readonly type = AuthActions.AUTHENTICATE;

    constructor(public payload: User) { }
}

export class AuthenticateSuccessAction implements Action {
    readonly type = AuthActions.AUTHENTICATE_SUCCESS;

    constructor(public infoUser: ResponseLogin) { }
}

export class AuthenticateFailedAction implements Action {
    readonly type = AuthActions.AUTHENTICATE_FAILED;

    constructor(public error: string) { }
}

export class LogoutAction implements Action {
    readonly type = AuthActions.LOGOUT;
}

export class LogouSuccessAction implements Action {
    readonly type = AuthActions.LOGOUT_SUCCESS;
}

export class LockAction implements Action {
    readonly type = AuthActions.LOCK;
}

export class UnlockAction implements Action {
    readonly type = AuthActions.UNLOCK;

    constructor(public user: User) { }
}

export class UnlockSuccessAction implements Action {
    readonly type = AuthActions.UNLOCK_SUCCESS;

    constructor(public date: Date) { }
}

export class UnlockFailedAction implements Action {
    readonly type = AuthActions.UNLOCK_FAILED;

    constructor(public error: string) { }
}

export type AuthTypes = AuthenticateAction |
                        AuthenticateFailedAction |
                        AuthenticateSuccessAction |
                        LogoutAction |
                        LogouSuccessAction |
                        LockAction |
                        UnlockAction |
                        UnlockSuccessAction |
                        UnlockFailedAction;