import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crypter',
  templateUrl: './crypter.component.html',
  styles: []
})
export class CrypterComponent implements OnInit {
  roles: string[];

  constructor() {
    this.roles = JSON.parse(sessionStorage.getItem('roles'));
  }

  ngOnInit() {
  }

}
