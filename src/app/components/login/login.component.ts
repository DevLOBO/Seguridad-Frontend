import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.reducer';
import { AuthenticateAction } from '../../ngrx/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  formLogin: FormGroup;
  error: string;
  loading = false;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.store.select('auth').subscribe(auth => {
      this.loading = auth.loading;
      this.error = auth.error;
    });

    this.formLogin = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const a = new AuthenticateAction(this.formLogin.value);
    this.store.dispatch(a);
  }

  get username() { return this.formLogin.get('username') }
  get password() { return this.formLogin.get('password') }
}
