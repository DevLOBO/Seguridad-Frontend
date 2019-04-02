import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.reducer';
import { LogoutAction } from '../../ngrx/actions/auth.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: []
})
export class ToolbarComponent {
  logged: boolean;
  user: string;

  constructor(private store: Store<AppState>) {
    this.store.select('auth').subscribe(auth => {
      this.logged = auth.authenticated;
      this.user = auth.username;
    });
  }

  logout() {
    const a = new LogoutAction();
    this.store.dispatch(a);
  }
}
