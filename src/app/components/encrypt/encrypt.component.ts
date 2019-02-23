import { Component } from '@angular/core';
import { CryptInfo } from '../../models/crypt-info';
import { CrypterService } from '../../services/crypter.service';

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styles: []
})
export class EncryptComponent {
  cryptInfo: CryptInfo;
  msg: string;

  constructor(private crypterService: CrypterService) { }

  encrypt() {
    this.crypterService.encrypt(this.msg)
      .then(enc =>
        this.cryptInfo = enc)
      .catch(console.log);
  }
}
