import { Component } from '@angular/core';
import { CrypterService } from '../../services/crypter.service';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styles: []
})
export class DecryptComponent {
  img: string;
  key: string;
  msg: string;

  constructor(private crypterService: CrypterService) { }

  decrypt() {
    this.crypterService.decrypt(this.key, this.img)
      .then(dec =>
        this.msg = dec.message)
      .catch(console.log);
  }
}
