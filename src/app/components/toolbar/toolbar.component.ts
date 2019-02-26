import { Component, DoCheck } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: []
})
export class ToolbarComponent implements DoCheck {
  logged: boolean;
  user: string;

  constructor(private loginService: LoginService) { }

  ngDoCheck() {
    this.user = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');
    this.logged = token ? true : false;
  }

  logout() {
    this.loginService.logout();
  }
}
