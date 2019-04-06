import { Component } from '@angular/core';
import { CryptInfo } from '../../models/crypt-info';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.reducer';
import { EncryptAction } from '../../ngrx/actions/crypter.actions';

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styles: []
})
export class EncryptComponent {
  formCrypt: FormGroup;
  loading: boolean;
  user: string;
  ok: boolean;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.store.subscribe(all => {
      this.loading = all.crypter.loading;
      this.user = all.auth.username;
      this.ok = all.crypter.ok;
    });

    this.formCrypt = this.fb.group({
      message: ['', Validators.required],
      time: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9]{1,2})?')]],
      to: ['', [Validators.required, Validators.email]]
    });
  }

  encrypt() {
    const c = { ...this.formCrypt.value, username: this.user };
    const a = new EncryptAction(c);
    this.store.dispatch(a);
  }
}
