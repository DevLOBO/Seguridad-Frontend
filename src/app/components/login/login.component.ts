import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  formLogin: FormGroup;
  error: string;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.formLogin = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.error = '';
    this.loginService.login(this.formLogin.value)
      .then(() => this.formLogin.reset())
      .catch(err => this.error = err);
  }

  get username() { return this.formLogin.get('username') }
  get password() { return this.formLogin.get('password') }
}
