import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CrypterActions, EncryptSuccessAction, EncryptFailedAction, DecryptSuccessAction, DecryptFailedActions } from '../actions/crypter.actions';
import { CrypterService } from 'src/app/services/crypter.service';

@Injectable()
export class CrypterEffect {
    constructor(private actions: Actions, private cs: CrypterService) { }

    @Effect()
    encrypt = this.actions.pipe(
        ofType(CrypterActions.ENCRYPT),
        switchMap(act => this.cs.encrypt(act['encrypt']).pipe(
            map(crypt => new EncryptSuccessAction(crypt)),
            catchError(e => of(new EncryptFailedAction(e['error']['error'])))
        ))
    );

    @Effect()
    decrypt = this.actions.pipe(
        ofType(CrypterActions.DECRYPT),
        switchMap(act => this.cs.decrypt(act['decrypt']).pipe(
            map(decrypted => new DecryptSuccessAction(decrypted)),
            catchError(e => of(new DecryptFailedActions(e['error']['error'])))
        ))
    );
}
