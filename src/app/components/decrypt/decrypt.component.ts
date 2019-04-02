import { Component } from '@angular/core';
import { CryptInfo } from '../../models/crypt-info';
import { Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.reducer';
import { DecryptAction } from '../../ngrx/actions/crypter.actions';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styles: []
})
export class DecryptComponent {
  key: FormControl;
  img: string;
  cryptInfo: CryptInfo;
  loading = false;
  user: string;
  ok: boolean;

  constructor(private store: Store<AppState>) {
    this.store.subscribe(all => {
      this.loading = all.crypter.loading;
      this.cryptInfo = all.crypter.crypt;
      this.user = all.auth.username;
      this.ok = all.crypter.ok;
    });

    this.key = new FormControl('', Validators.required)
  }

  decrypt() {
    const c: CryptInfo = { username: this.user, image: this.img,  key: this.key.value };
    const a = new DecryptAction(c);
    this.store.dispatch(a);
  }

  convertFileToString(file: File) {
    const reader = new FileReader();
    
    reader.onload = (e: any) =>
      this.img = btoa(e.target.result);

    reader.readAsBinaryString(file);
  }
}
