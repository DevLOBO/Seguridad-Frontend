import { Component } from '@angular/core';
import { CrypterService } from '../../services/crypter.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
import { CryptInfo } from '../../models/crypt-info';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styles: []
})
export class DecryptComponent {
  img: string;
  key: string;
  cryptInfo: CryptInfo;

  constructor(private crypterService: CrypterService, private dialog: MatDialog) { }

  decrypt() {
    this.crypterService.decrypt(this.key, this.img)
      .then(dec =>
        this.cryptInfo = dec)
      .catch(err => {
        this.msg = null;
        this.dialog.open(ModalComponent, { width: '*', data: err['error'] });
      });
  }

  convertFileToString(file: File) {
    const reader = new FileReader();
    
    reader.onload = (e: any) =>
      this.img = btoa(e.target.result);

    reader.readAsBinaryString(file);
  }
}
