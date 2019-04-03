import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.reducer';
import { UnlockAction, LogoutAction } from '../../ngrx/actions/auth.actions';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-re-login',
  templateUrl: './re-login.component.html',
  styles: []
})
export class ReLoginComponent {
  password: string;
  username: string;
  loading: boolean;
  error: string;

  constructor(private store: Store<AppState>, private ref: MatDialogRef<ReLoginComponent>) {
    this.store.select('auth').subscribe(auth => {
      this.error = auth.error;
      this.username = auth.username;
      this.loading = auth.loading;

      if (!(auth.locked && auth.authenticated)) this.ref.close();
    });
  }

  login() {
    const c = { username: this.username, password: this.password };
    const a = new UnlockAction(c);
    this.store.dispatch(a);
  }

  logout() {
    const a = new LogoutAction();
    this.store.dispatch(a);
  }
}
