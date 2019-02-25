import { Component } from '@angular/core';
import { CrypterService } from '../../services/crypter.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styles: []
})
export class DecryptComponent {
  img: string;
  key: string;
  msg: string;

  constructor(private crypterService: CrypterService, private dialog: MatDialog) { }

  decrypt() {
    this.crypterService.decrypt(this.key, this.img)
      .then(dec =>
        this.msg = dec.message)
      .catch(err => {
        this.msg = null;
        this.dialog.open(ModalComponent, { width: '*', data: err['error'] });
      });
  }

  convertFileToString(file: File) {
    const reader = new FileReader();
    
    reader.onload = e =>
      this.img = btoa(e.target.result);

    reader.readAsBinaryString(file);
  }
}
