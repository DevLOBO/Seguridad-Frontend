import { Injectable, Pipe } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActions, LogouSuccessAction, AuthenticateSuccessAction, AuthenticateFailedAction, LockScreenAction, UnlockScreenAction, UnlockScreenSuccessAction, UnlockScreenFailedAction } from '../actions/auth.actions';
import { LoginService } from '../../services/login.service';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Injectable()
export class AuthEffect {
    constructor(
        private actions: Actions,
        private ls: LoginService,
        private router: Router,
    ) { }

    @Effect()
    loginAction = this.actions.pipe(
        ofType(AuthActions.AUTHENTICATE),
        switchMap(act => this.ls.login(act['payload']).pipe(
            map(info => new AuthenticateSuccessAction(info)),
            tap(a => {
                this.router.navigate(['/crypter']);
                return a;
            }),
            catchError(e => of(new AuthenticateFailedAction(e['error']['error'])))
        ))
    );

    @Effect()
    logoutAction = this.actions.pipe(
        ofType(AuthActions.LOGOUT),
        switchMap(() => {
            this.router.navigate(['/']);
            return of(new LogouSuccessAction());
        })
    );
}
