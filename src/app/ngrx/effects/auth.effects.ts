import { Injectable, Pipe } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActions, LogouSuccessAction, AuthenticateSuccessAction, AuthenticateFailedAction, UnlockSuccessAction, UnlockFailedAction } from '../actions/auth.actions';
import { LoginService } from '../../services/login.service';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ReLoginComponent } from '../../components/re-login/re-login.component';

@Injectable()
export class AuthEffect {
    constructor(
        private actions: Actions,
        private ls: LoginService,
        private router: Router,
        private dialog: MatDialog
    ) { }

    @Effect()
    loginAction = this.actions.pipe(
        ofType(AuthActions.AUTHENTICATE),
        switchMap(act => this.ls.login(act['payload']).pipe(
            map(info => new AuthenticateSuccessAction(info)),
            tap(a => {
                this.router.navigate(['/crypter']);
                this.ls.startWatch();
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

    @Effect({ dispatch: false })
    lockAction = this.actions.pipe(
        ofType(AuthActions.LOCK),
        map(() => {
            this.ls.stopWatch();
            this.openDialog();
        })
    );

    @Effect()
    unlockAction = this.actions.pipe(
        ofType(AuthActions.UNLOCK),
        switchMap(act => this.ls.login(act['user']).pipe(
            map(info => new UnlockSuccessAction(info.expiration)),
            catchError(e => of(new UnlockFailedAction(e['error']['error'])))
        ))
    );

    @Effect({ dispatch: false })
    unlockSuccessAction = this.actions.pipe(
        ofType(AuthActions.UNLOCK_SUCCESS),
        map(() =>
            this.ls.startWatch())
    );

    openDialog() {
        this.dialog.open(ReLoginComponent, { disableClose: true });
    }
}
