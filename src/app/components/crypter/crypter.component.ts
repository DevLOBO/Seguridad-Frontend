import { Component } from '@angular/core';
import { ReLoginComponent } from '../re-login/re-login.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.reducer';
import { LockScreenAction } from '../../ngrx/actions/auth.actions';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-crypter',
  templateUrl: './crypter.component.html',
  styles: []
})
export class CrypterComponent {
  roles: string[];

  constructor(
    private ls: LoginService,
    private store: Store<AppState>
  ) {
    this.store.select('auth').subscribe(auth => {
      this.roles = auth.roles;

      if (!auth.locked) this.ls.isExpired();
      else this.store.dispatch(new LockScreenAction());
    });
    
  }
}
