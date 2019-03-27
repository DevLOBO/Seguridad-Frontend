import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LoginService } from '../../services/login.service';

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
    private loginService: LoginService
  ) {
    this.username = sessionStorage.getItem('username');
  }

  login() {
    this.loginService.login({ username: this.username, password: this.password})
    .then(() => this.dialogRef.close())
    .catch(error => this.error = error['error']['error']);
  }

  logout() {
    this.dialogRef.close();
    this.loginService.logout();
  }
}
