import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.reducer';
import { LogoutAction, UnlockScreenAction } from '../../ngrx/actions/auth.actions';

@Component({
  selector: 'app-re-login',
  templateUrl: './re-login.component.html',
  styles: []
})
export class ReLoginComponent {
  password: string;
  username: string;
  error: string;

  constructor(
    private dialogRef: MatDialogRef<ReLoginComponent>,
    private store: Store<AppState>
  ) {
    this.store.select('auth').subscribe(auth => {
      this.error = auth.error;
      this.username = auth.username;
      
      if (!auth.locked) this.dialogRef.close();
    });
  }

  login() {
    const c = { username: this.username, password: this.password };
    const a = new UnlockScreenAction(c);
    this.store.dispatch(a);
  }

  logout() {
    this.dialogRef.close();
    const a = new LogoutAction();
    this.store.dispatch(a);
  }
}
