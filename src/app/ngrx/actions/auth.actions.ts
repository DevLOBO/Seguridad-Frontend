import { Action } from '@ngrx/store';
import { ResponseLogin } from '../../models/response-login';
import { User } from '../../models/user';

export enum AuthActions {
    AUTHENTICATE = '[Auth] Authenticate',
    AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success',
    AUTHENTICATE_FAILED = '[Auth] Authenticate Failed',
    LOGOUT = '[Auth] Logout',
    LOGOUT_SUCCESS = '[Auth] Logout Success',
    LOCK_SCREEN = '[Auth] Lock Screen',
    LOCK_SCREEN_SUCCESS = '[Auth] Lock Screen Success',
    UNLOCK_SCREEN = '[Auth] Unlock Screen',
    UNLOCK_SCREEN_SUCCESS = '[Auth] Unlock Screen Success',
    UNLOCK_SCREEN_FAILED = '[Auth] Unlock Screen Failed'
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

export type AuthTypes = AuthenticateAction |
                        AuthenticateFailedAction |
                        AuthenticateSuccessAction |
                        LogoutAction |
                        LogouSuccessAction;