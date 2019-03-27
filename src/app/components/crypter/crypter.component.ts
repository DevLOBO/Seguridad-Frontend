import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material';
import { ReLoginComponent } from '../re-login/re-login.component';

@Component({
  selector: 'app-crypter',
  templateUrl: './crypter.component.html',
  styles: []
})
export class CrypterComponent {
  roles: string[];

  constructor(
    private loginService: LoginService,
    private dialog: MatDialog
  ) {
    this.roles = JSON.parse(sessionStorage.getItem('roles'));
    this.loginService.isExpired().subscribe(is => {
      console.log(is);
      if (is)
        this.openDialog();
    });
  }

  openDialog() {
    this.dialog.open(ReLoginComponent, {
      disableClose: true
    });
  }
}
