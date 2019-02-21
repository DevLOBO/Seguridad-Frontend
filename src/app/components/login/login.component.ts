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

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.formLogin = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loginService.login(this.formLogin.value)
  }

  get username() { return this.formLogin.get('username') }
  get password() { return this.formLogin.get('password') }
}
