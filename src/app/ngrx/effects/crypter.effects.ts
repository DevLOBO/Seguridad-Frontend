import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CrypterActions, EncryptSuccessAction, EncryptFailedAction, DecryptSuccessAction, DecryptFailedActions } from '../actions/crypter.actions';
import { CrypterService } from 'src/app/services/crypter.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../components/modal/modal.component';

@Injectable()
export class CrypterEffect {
    constructor(private actions: Actions, private cs: CrypterService, private dialog: MatDialog) { }

    @Effect()
    encrypt = this.actions.pipe(
        ofType(CrypterActions.ENCRYPT),
        switchMap(act => this.cs.encrypt(act['encrypt']).pipe(
            map(crypt => new EncryptSuccessAction(crypt)),
            catchError(e => {
                this.openModal();
                return of(new EncryptFailedAction(e['error']));
            })
        ))
    );

    @Effect()
    decrypt = this.actions.pipe(
        ofType(CrypterActions.DECRYPT),
        switchMap(act => this.cs.decrypt(act['decrypt']).pipe(
            map(decrypted => new DecryptSuccessAction(decrypted)),
            catchError(e => {
                this.openModal();
                return of(new DecryptFailedActions(e['error']));
            })
        ))
    );

    openModal() {
        this.dialog.open(ModalComponent, {
            disableClose: true
        });
    }
}
