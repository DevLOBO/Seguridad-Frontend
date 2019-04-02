import { Component } from '@angular/core';

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
  ) {
  }

  login() {
    // Confirmar contraseña
  }

  logout() {
    // Salir
  }
}
